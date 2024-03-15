const { checkSchema } = require("express-validator");

const PostUserValidator = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Invalid Email Format",
    },
    trim: true,
    errorMessage: "Invalid Email must not be empty",
  },
  username: {
    notEmpty: true,
    isLength: {
      options: {
        min: 3,
        max: 10,
      },
      errorMessage: "Only max 10 characters allowed",
    },
    trim: true,
    errorMessage: "Invalid Username must not be empty",
  },
  dateOfBirth: {
    notEmpty: true,
    isDate: true,
    errorMessage: "Invalid Dob must not be empty",
  },
});
const UpdateUserValidator = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Invalid Email Format",
    },
    isEmpty: true,
  },

  username: {
    isLength: {
      options: {
        min: 3,
        max: 10,
      },
      errorMessage: "Only max 10 characters allowed",
    },
    trim: true,
    isEmpty: true,
  },
  dateOfBirth: {
    isDate: true,
    errorMessage: "Invalid Dob ",
    isEmpty: true,
  },
});
module.exports = { PostUserValidator, UpdateUserValidator };
