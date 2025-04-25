// routes/budgetRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('budgetplanning', { user: req.user });
});

module.exports = router;
