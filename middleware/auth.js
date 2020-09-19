const createError = require("../utilis/createError");
const verifyToken = require("../utilis/jwt");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!(authorization && authorization.toLowerCase().startsWith("bearer")))
    throw createError(401, "Not authorized");
  //Or check for cookie...

  const token = authorization.split(" ")[1];

  const decodeToken = verifyToken(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodeToken._id);

  next();
});

const permission = (role) => (req, res, next) => {
  if (role !== req.user.role)
    throw createError(
      401,
      `User role ${req.user.role} is not allowed to access this resource`
    );

  next();
};
module.exports = { protect, permission };
