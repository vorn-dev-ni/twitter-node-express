const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
let url = ''

if (process.env.NODE_ENV === "production") {
  console.log("production");
  url  = process.env.DATABASE_PRODUCTION;
} else {
  console.log("development");
  url  = process.env.DATABASE_DEVELOPMENT;
}
async function dbConnect() {
  mongoose.connection.on("connected", () => console.log("connected"));
  mongoose.connection.on("open", () => console.log("open"));
  await mongoose.connect(url);
}

module.exports = dbConnect;
