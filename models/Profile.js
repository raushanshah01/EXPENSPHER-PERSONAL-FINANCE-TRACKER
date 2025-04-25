// models/Profile.js
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  income: Number,
  expenses: Number,
  savingGoal: Number,
  financeGoal: String,
  goalAmount: Number,
  billAlert: String
});

module.exports = mongoose.model('Profile', ProfileSchema);
