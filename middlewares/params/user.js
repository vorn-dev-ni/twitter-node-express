const asyncHandler = require("express-async-handler");
const { userModel } = require("../../models/user.js");
const { isValidObjectId } = require("mongoose");

const userParamsHandler = asyncHandler(async (req, res, next, id) => {
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      error: {
        status: 404,
        name: "Runtime",
        message: "Invalid Object Id",
        details: {},
      },
    });
  }
  const users = await userModel.findById(id);
  if (!users) {
    return res.status(404).json({
      data: null,
      error: {
        status: 404,
        name: "Run Time",
        message: "Data is Empty",
        details: {},
      },
    });
  }
  return next();
});

module.exports = { userParamsHandler };
