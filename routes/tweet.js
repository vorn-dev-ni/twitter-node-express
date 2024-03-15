const express = require("express");
const tweetRoute = express.Router();
const { tweetParamsHandler } = require("../middlewares/params/tweet.js");
const {
  deleteTweetById,
  getTweetById,
  postTweet,
  updateTweetById,
  getAllTweets,
} = require("../controllers/tweet.js");
tweetRoute.get("/", getAllTweets).post("/", postTweet);

tweetRoute.param("/:id", tweetParamsHandler);

tweetRoute
  .get("/:id", getTweetById)
  .delete("/:id", deleteTweetById)
  .put("/:id", updateTweetById);

module.exports = tweetRoute;
