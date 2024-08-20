const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    // process.exit(1);
  }
};
module.exports = connection;
