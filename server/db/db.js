const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected To mongoDB");
  })
  .catch((e) => {
    console.log(e);
  });
