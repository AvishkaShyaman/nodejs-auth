const mongoose = require("mongoose");

const db = () => {
  const MONGODB_URL = process.env.MONGODB_URI;

  mongoose.connect(
    MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log("Database Error ", err.message);
      }
    }
  );

  mongoose.connection.once("open", () => {
    console.log("Database connected");
  });
};

module.exports = db;