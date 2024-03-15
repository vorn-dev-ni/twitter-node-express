const express = require("express");
const userRouter = express.Router();
const {
  getAllUsers,
  getUserById,
  getTweetsByUserId,
  createUser,
  deleteUser,
  updateUser,
  getUserFollowers,
  getUserFollowings
} = require("../controllers/user.js");

const { UserValidator} = require("../validators/index.js");
const { handleValidation } = require("../middlewares/index.js");
const { checkUserData } = require("../middlewares/data/index");
const { userParamsHandler } = require("../middlewares/params/user.js");
userRouter
  .get("/", checkUserData, getAllUsers)
  .post("/", UserValidator, handleValidation, createUser);
userRouter.param("userId", userParamsHandler);
userRouter
  .get("/:userId", getUserById)
  .put("/:userId", UserValidator, handleValidation, updateUser)
  .delete("/:userId", deleteUser);
userRouter.get("/:userId/tweets", getTweetsByUserId);
userRouter.get("/:userId/followers", getUserFollowers);
userRouter.get("/:userId/followings", getUserFollowings);
module.exports = userRouter;
