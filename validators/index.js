const { checkSchema } = require("express-validator");

const UserValidator = checkSchema({
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

const TweetValidator = checkSchema({
  text: {
    trim: true,
    notEmpty: true,
    isLength: {
      options: {
        max: 250,
      },
      errorMessage: "Only max 250 characters allowed",
    },
    errorMessage: "Invalid Text must not be empty",
  },
  byUserId: {
    notEmpty: true,
    trim: true,
    errorMessage: "Invalid Username must not be empty",
  },
});

module.exports = { UserValidator, TweetValidator };
