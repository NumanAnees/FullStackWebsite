const mongoose = require("mongoose");
//creating database
mongoose
  .connect("mongodb://localhost:27017/fullStackDb", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
