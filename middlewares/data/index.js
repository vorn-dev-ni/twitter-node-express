const asyncHandler = require("express-async-handler");
const { userModel } = require("../../models/user.js");
const { isValidObjectId } = require("mongoose");

const checkUserData = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({});
  if (!users?.length) {
    return res.status(404).json({
      data: null,
      error: {
        status: 404,
        name: "Not Found Error",
        message: "Not Found",
        details: {},
      },
    });
  }
  return next();
});
const checkUserIdExist = asyncHandler(async (req, res, next, byUserId) => {
  if (!isValidObjectId(byUserId)) {
    return res.status(404).json({
      data: null,
      error: {
        status: 404,
        name: "Operation Input",
        message: "Invalid Object Id ",
        details: {},
      },
    });
  }
  const user = await userModel.findById(byUserId);
  if (!user) {
    return res.status(404).json({
      data: null,
      error: {
        status: 404,
        name: "Operation Input",
        message: "User does not exist",
        details: {},
      },
    });
  }
});
module.exports = { checkUserData, checkUserIdExist };
