const express = require("express");
const userRouter = express.Router();
const {
  getAllUsers,
  getUserById,
  getTweetsByUserId,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/user.js");

const { PostUserValidator,UpdateUserValidator } = require("../validators/index.js");
const { handleValidation } = require("../middlewares/index.js");
const { checkUserData } = require("../middlewares/data/index");
const { userParamsHandler } = require("../middlewares/params/index.js");
userRouter
  .get("/", checkUserData, getAllUsers)
  .post("/", PostUserValidator, handleValidation, createUser);
userRouter.param("userId", userParamsHandler);
userRouter
  .get("/:userId", getUserById)
  .put("/:userId", UpdateUserValidator, handleValidation, updateUser)
  .delete("/:userId", deleteUser);
userRouter.get("/:userId/tweets", getTweetsByUserId);

module.exports = userRouter;
