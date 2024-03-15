const asyncHandler = require("express-async-handler");
const { userModel } = require("../../models/user.js");

const checkUserData = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({});
  if (!users?.length) {
    return res.status(404).json({
      data: null,
      error: {
        status: 404,
        name: "NotFoundError",
        message: "Not Found",
        details: {},
      },
    });
  }
  return next();
});

module.exports = { checkUserData };
