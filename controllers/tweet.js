const { tweetModel } = require("../models/tweet.js");

const getAllTweets = async (req, res) => {
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
};

const getTweetById = async (req, res) => {
  const tweet = await tweetModel
    .findById(req.params.id)
    .select("-__v")
    .populate("byUser", "-password -__v -followings -followers -tweets");
  res.status(200).json({
    id: tweet?.id,
    attributes: tweet,
    meta: {},
  });
};

const postTweet = async (req, res) => {
  const id = req.params.id;
  const tweet = await tweetModel.findById(id).populate("byUser");
  res.send(tweet);
};

const updateTweetById = async (req, res) => {
  const id = req.params.id;
  const tweet = await tweetModel.findById(id).populate("byUser");
  res.send(tweet);
};

const deleteTweetById = async (req, res) => {
  const id = req.params.id;
  const tweet = await tweetModel.findById(id).populate("byUser");
  res.send(tweet);
};

module.exports = {
  getTweetById,
  postTweet,
  updateTweetById,
  deleteTweetById,
  getAllTweets,
};
