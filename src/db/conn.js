const mongoose = require("mongoose");
require("dotenv").config();

var path = process.env.MONGODB_URL;
// creating a database
mongoose
  .connect(path, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful with db");
  })
  .catch((err) => {
    console.log(err);
  });
