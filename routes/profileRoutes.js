const express = require('express');
const User = require('../models/User');
const Profile = require('../models/Profile');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Update Financial Data
router.post('/update-finances', authMiddleware, async (req, res) => {
    try {
        const { monthlyIncome, expenses, savings } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found');

        user.monthlyIncome = monthlyIncome;
        user.expenses = expenses;
        user.savings = savings;
        await user.save();

        res.status(200).json({ message: 'Finances updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// ✅ Render profile page with user + profile details
router.get('/', authMiddleware, async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.user._id });
        
        if (!profile) {
            return res.status(404).send('Profile not found');
        }

        res.render('profile', {
            user: {
                ...req.user.toObject(),
                monthlyIncome: profile.monthlyIncome,
                expenses: profile.expenses,
                savings: profile.savings
            },
            profile
        });
    } catch (err) {
        console.error('Error loading profile:', err);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
