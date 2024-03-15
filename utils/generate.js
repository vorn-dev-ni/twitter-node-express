const { faker } = require("@faker-js/faker");
const { userModel } = require("../models/user.js");
const { tweetModel } = require("../models/tweet.js");
const { linkRelation } = require("./link-relationship.js");
const users = 50;
const tweets = 1000;

const dbConnect = require("../db/db.js");

dbConnect().catch((err) => {
  console.log(err);
});

async function generate() {
  let userList = [];
  for (let i = 0; i < users; i++) {
    let user = new userModel({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      dateOfBirth: faker.date.birthdate(),
      password: faker.internet.password(),
    });
    const result = await user.save();
    userList.push(result._id);
    console.log(`user: ${result._id} generated!`);
  }
  for (let i = 0; i < userList.length; i++) {
    const randomIndex = Math.floor(Math.random() * userList.length);
    let followBy = await userModel.findById(userList[randomIndex]);
    let followTo = await userModel.findById(userList[i]);
    followBy.followers?.push(userList[i]);
    followTo.followings?.push(userList[randomIndex]);
    await followBy?.save();
    await followTo?.save();
    console.log(
      `follwer and following: ${followBy.id}  : ${followTo.id}  generated!`
    );
  }

  for (let i = 0; i < tweets; i++) {
    const randomIndex = Math.floor(Math.random() * userList.length);
    let tweet = new tweetModel({
      text: faker.lorem.paragraph(),
      byUser: userList[randomIndex],
      createdDate: new Date(),
    });
    const result = await tweet.save();
    console.log(`tweet: ${result._id} generated!`);
  }
  linkRelation();
}

generate();
