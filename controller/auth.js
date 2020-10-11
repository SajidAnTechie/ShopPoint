const crypto = require("crypto");
const createError = require("../utilis/createError");
const asyncHandler = require("../middleware/async");
const verifyEmail = require("../utilis/verifyEmail.js");
const cron = require("node-cron");
const User = require("../models/User");

const RegisterUser = asyncHandler(async (req, res, next) => {
  var uid = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  var charactersLength = characters.length;

  for (var i = 0; i < 6; i++) {
    uid += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const newUser = await User.create({ ...req.body, uid: uid });

  try {
    const options = {
      email: newUser.email,
      subject: "Email Verification",
      code: uid,
      name: newUser.name,
    };

    await verifyEmail(options);

    var job = cron.schedule(
      "59 * * * *",
      async () => {
        try {
          const user1 = await User.findOne({
            email: newUser.email,
          });
          if (user1.verify === false) {
            try {
              await User.findOneAndDelete({
                email: user1.email,
              });
            } catch (er) {
              console.log(er);
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      {
        scheduled: false,
      }
    );

    job.start();

    res.status(200).send({
      status: "success",
      message: "Email Verification Code sent to your email.",
    });
  } catch (error) {
    throw createError(500, "Verification email cound't be sent");
  }

  // sendTokenResponse(newUser, 200, res);
});

const login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    verify: true,
  }).select("+password");
  if (!user) throw createError(401, `Email doesn't match`);

  const isPassword = await user.matchPassword(req.body.password);
  if (!isPassword) throw createError(401, `Password doesn't match`);

  sendTokenResponse(user, 200, res);
});

const verificationEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    uid: req.body.verificationCode,
  });

  if (!user) throw createError(401, "Invalid verifaication code");

  if (user.verify)
    throw createError(401, "You have already verified. Login in to continue.");

  user.verify = true;

  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 200, res);
});

//Update user details

const updateDetails = asyncHandler(async (req, res, next) => {
  const newDetails = {
    name: req.body.name,
    email: req.body.email,
  };

  const editDetails = await User.findByIdAndUpdate(req.user._id, newDetails, {
    new: true,
    runValidators: true,
  });

  const updateDetails = await User.findById(req.user._id);
  res.status(200).send({ status: "success", data: updateDetails });
});

//Update Password

const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  //compare currentPassword

  const isMatch = await user.matchPassword(req.body.currentPassword);
  if (!isMatch)
    throw createError(
      400,
      `Current password ${req.body.currentPassword} does't match`
    );

  user.password = req.body.newPassword;

  await user.save();

  sendTokenResponse(user, 200, res);
});

//Forgot Password

const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    throw createError(400, `User with email ${req.body.email} is not found`);

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  try {
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/resetPassword/?token=${resetToken}`;

    const message = `You are receiving this email because you (or someone else ) has
    requested the reset of a password.`;

    const options = {
      email: user.email,
      subject: "Password reset token",
      message,
      url: resetUrl,
    };

    await sendEmail(options);

    res
      .status(200)
      .send({ status: "success", message: "ResetPassword token Email sent" });
  } catch (error) {
    console.log(error);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    throw createError(500, "Email cound't be sent");
  }
});

//ResetPassword

const resetPassword = asyncHandler(async (req, res, next) => {
  //Hash the resetToken

  const resetToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) throw createError(400, `Invalid token ${req.body.token}`);

  user.password = req.body.newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res
    .status(200)
    .send({ status: "success", message: "Your Password has beed changed" });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.genAuthToken();

  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    verify: user.verify,
  };

  res.status(statusCode).send({ status: "success", token, authData: userData });
};

module.exports = {
  RegisterUser,
  login,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  verificationEmail,
};
