const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pyandakhan:pyanda123@project1.txczd.mongodb.net/?retryWrites=true&w=majority&appName=project1",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
