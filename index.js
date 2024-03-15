const express = require("express");
require('dotenv').config({path:'./.env'})
const userRouter = require("./routes/user.js");
const tweetRoute = require("./routes/tweet.js");
const dbConnect = require("./db/db.js");
const app = express();
dbConnect().catch((err) => {
  console.log(err);
});
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/tweets", tweetRoute);
app.use("*", (req, res, next) => {
  res.status(404).json({
    error: {
      status: 404,
      name: "Not Found Error",
      message: "Page Not Found or Exist",
      details: {},
    },
  });
});
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
