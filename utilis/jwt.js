const jwt = require("jsonwebtoken");
const createError = require("./createError");

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if (error.name === "TokenExpiredError")
      throw createError(401, "Token is expired. Please Login");

    throw error;
  }
};

module.exports = verifyToken;
