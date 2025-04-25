// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();

// Define the route for the review page
router.get('/', (req, res) => {
  res.render('review', { user: req.user }); // Render the 'review' view and pass the user data
});

module.exports = router;
