const express = require("express");
const tweetRoute = express.Router();
const { tweetParamsHandler } = require("../middlewares/params/tweet.js");
const { TweetValidator } = require("../validators/index.js");
const { handleValidation } = require("../middlewares/index.js");
const {
  deleteTweetById,
  getTweetById,
  postTweet,
  updateTweetById,
  getAllTweets,
} = require("../controllers/tweet.js");
tweetRoute
  .get("/", getAllTweets)
  .post("/", TweetValidator, handleValidation, postTweet);
tweetRoute.param("id", tweetParamsHandler);
tweetRoute
  .get("/:id", getTweetById)
  .delete("/:id", deleteTweetById)
  .put("/:id", TweetValidator, handleValidation, updateTweetById);

module.exports = tweetRoute;
