// routes/contactRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact', { user: req.user }); // render contact.ejs
});

module.exports = router;
