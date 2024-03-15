const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const url = process.env.DATABASE_URL
async function dbConnect() {
  mongoose.connection.on("connected", () => console.log("connected"));
  mongoose.connection.on("open", () => console.log("open"));
  await mongoose.connect(url);
}

module.exports = dbConnect;
