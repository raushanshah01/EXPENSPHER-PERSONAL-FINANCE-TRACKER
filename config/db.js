const mongoose = require("mongoose");

const MONGO_URL = 'mongodb://127.0.0.1:27017/Expensphere';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL); // No need for deprecated options
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Database connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
