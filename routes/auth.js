const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("../models/User"); // Import User model
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

// Configure express-session
router.use(session({
    secret: process.env.SESSION_SECRET || "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true } // Set secure to true if using HTTPS
}));

// Register Route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Store user session
        req.session.user = { id: user._id, name, email };

        res.status(201).json({ msg: "Registration successful", user: req.session.user });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Store user session
        req.session.user = { id: user._id, name: user.name, email: user.email };

        res.json({ msg: "Login successful", user: req.session.user });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Logout Route
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ msg: "Logout failed" });
        res.json({ msg: "Logout successful" });
    });
});

module.exports = router;
