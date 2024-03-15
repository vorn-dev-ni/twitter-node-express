const asyncHandler = require("express-async-handler");
const { userModel } = require("../models/user.js");
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({}).select("-__v -password");
  let payload = [];
  users?.forEach((user) => {
    const result = {
      id: user.id,
      attributes: user,
      meta: {},
    };
    payload.push(result);
  });

  res.status(200).json({
    data: payload,
  });
});

const getTweetsByUserId = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const users = await userModel.findById(id).populate("tweets").select("-followers -followings -password -__v ").exec();
  res.status(200).json(users);
});

const getUserFollowings = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const user = await userModel.findById(id).populate("followings","-__v -tweets -password -followers -followings")
  .select('-password -followers -tweets -__v').exec();
  res.status(200).json(user);
});

const getUserFollowers = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const user = await userModel.findById(id).populate("followers","-__v -tweets -password -followers -followings")
  .select('-password -followings -tweets -__v').exec();
  res.status(200).json(user);
});

const getUserById = async (req, res) => {
  const id = req.params.userId;
  const user = await userModel.findById(id).select("-password -__v");
  res.status(200).json({
    id: user?.id,
    attributes: user,
    meta: {},
  });
};
const getUserByTweet = async (req, res) => {
  const id = req.params.userId;
  const user = await userModel.findById(id).select("-password -__v");
  res.status(200).json({
    id: user?.id,
    attributes: user,
    meta: {},
  });
};

const createUser = asyncHandler(async (req, res) => {
  const { username, dateOfBirth, email } = req.body;
  const parsedData = Date.parse(dateOfBirth);
  const newUser = new userModel({
    username,
    email,
    dateOfBirth: parsedData,
  });
  const result = await newUser.save();
  res.status(200).json(result);
});

const deleteUser = async (req, res) => {
  const id = req.params.userId;
  const result = await userModel.findByIdAndDelete(id).select("-password -__v");
  res.status(200).json({
    id: result?.id,
    data: {
      attributes: result,
    },
    meta: {
      response: "User has  been deleted",
    },
  });
};

const updateUser = async (req, res) => {
  const id = req.params.userId;
  const updated = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updated);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  getTweetsByUserId,
  getUserByTweet,
  getUserFollowers,
  getUserFollowings
};
