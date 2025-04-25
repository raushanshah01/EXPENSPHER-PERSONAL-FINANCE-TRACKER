<<<<<<< HEAD
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1); // Exit the process with failure
=======
const mongoose = require("mongoose");

const MONGO_URL = 'mongodb://127.0.0.1:27017/Expensphere';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL); // No need for deprecated options
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Database connection error:", err);
        process.exit(1);
>>>>>>> f9b3af4a138f0c001dbecf51e9de271d2f7d4a15
    }
};

module.exports = connectDB;
