const {
  RegisterUser,
  login,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("../controller/auth");
const { protect } = require("../middleware/auth");

const router = require("express").Router();

router.route("/register").post(RegisterUser);
router.route("/login").post(login);
router.route("/update/userDetails").put(protect, updateDetails);
router.route("/update/password").put(protect, updatePassword);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").post(resetPassword);

module.exports = router;
