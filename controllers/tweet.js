const asyncHandler = require("express-async-handler");
const { ObjectId } = require("mongodb");
const { tweetModel } = require("../models/tweet.js");
const { userModel } = require("../models/user.js");
const { checkUserIdExist } = require("../middlewares/data/index.js");
const getAllTweets = asyncHandler(async (req, res) => {
  const tweets = await tweetModel
    .find({})
    .select("-__v")
    .populate("byUser", "-password -__v -followings -followers -tweets");
  const payload = [];
  tweets.forEach((tweet) => {
    payload.push({
      id: tweet.id,
      attributes: tweet,
      meta: {},
    });
  });
  res.status(200).json({
    data: payload,
  });
});

const getTweetById = asyncHandler(async (req, res) => {
  const tweet = await tweetModel
    .findById(req.params.id)
    .select("-__v")
    .populate("byUser", "-password -__v -followings -followers -tweets");
  res.status(200).json({
    id: tweet?.id,
    attributes: tweet,
    meta: {},
  });
});

const postTweet = asyncHandler(async (req, res, next) => {
  const { byUserId, text } = req.body;
  checkUserIdExist(req, res, next, byUserId);
  const tweet = await tweetModel.create({ text, byUserId });
  return res.status(200).json(tweet);
});

const updateTweetById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { byUserId, text } = req.body;
  return checkUserIdExist(req, res, next, byUserId);
  const tweet = await tweetModel.findByIdAndUpdate(
    id,
    { text, byUserId },
    {
      new: true,
    }
  );
  res.status(200).json(tweet);
});

const deleteTweetById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const tweet = await tweetModel.findOneAndDelete(id);
  res.status(200).json({
    id: tweet?.id,
    data: {
      attributes: tweet,
    },
    meta: {
      response: "User has  been deleted",
    },
  });
});

module.exports = {
  getTweetById,
  postTweet,
  updateTweetById,
  deleteTweetById,
  getAllTweets,
};
