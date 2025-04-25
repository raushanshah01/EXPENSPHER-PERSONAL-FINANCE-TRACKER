const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Registration Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    res.render('input'); // Proceed to financial profile input
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    res.redirect('/home');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
});

// Submit Financial Profile Route
router.post('/submit-profile-info', authMiddleware, async (req, res) => {
  try {
    const { income, expenses, savingGoal, financeGoal, goalAmount, billAlert } = req.body;

    const profile = new Profile({
      userId: req.user.id,
      income,
      expenses,
      savingGoal,
      financeGoal,
      goalAmount: financeGoal === 'budget' ? goalAmount : null,
      billAlert
    });

    await profile.save();
    res.redirect('/home');
  } catch (err) {
    console.error('Profile save error:', err);
    res.status(500).send('Error saving profile.');
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  console.log('✅ Logout successful');
  res.redirect('/login');
});

module.exports = router;
