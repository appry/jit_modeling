const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  // Email validation

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is requried";
  }

  // Password validation
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
