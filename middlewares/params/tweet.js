const asyncHandler = require("express-async-handler");
const {tweetModel} = require("../../models/tweet");
const { isValidObjectId } = require("mongoose");

const tweetParamsHandler = asyncHandler(async (req, res, next, id) => {
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
  const tweet = await tweetModel.findById(id);
  if (!tweet) {
    return res.status(404).json({
      data: null,
      error: {
        status: 404,
        name: "Operation Input",
        message: "Data is Empty",
        details: {},
      },
    });
  }
  return next();
});

module.exports = { tweetParamsHandler };
