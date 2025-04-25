const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // ✅ Add this for reading JWT from cookies
const authMiddleware = require('./middleware/authMiddleware'); // ✅ Import the middleware
const User = require('./models/User'); // ✅ Import the User model
const path = require('path'); // ✅ Import the path module here
const Profile = require('./models/Profile');
const budgetRoutes = require('./routes/budgetRoutes');
const reportRoutes = require('./routes/reportRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); // ✅ Import the review routes
const contactRoutes = require('./routes/contactRoutes'); // Path to the contactRoutes.js file




dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 4480;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser()); // ✅ Needed for reading JWT from cookies

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // ✅ Path module already included here

// Routes
app.use('/auth', require('./routes/authRoutes')); // Authentication routes

// Pages
app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

// ✅ Protect Profile Route
app.use('/profile', authMiddleware, (req, res, next) => {
    console.log('Authenticated user:', req.user); // ✅ Debug log to verify user authentication
    next();
}, require('./routes/profileRoutes'));


// Serve budget planning page with auth
app.use('/budgetplanning', authMiddleware, (req, res, next) => {
    console.log('Authenticated user:', req.user); // ✅ Debug log
    next();
  }, budgetRoutes);

// Serve report page with auth
app.use('/report', authMiddleware, (req, res, next) => {
    console.log('Authenticated user:', req.user); // ✅ Debug log
    next();
  }, reportRoutes);

  // Use the authentication middleware and the review routes
app.use('/review', authMiddleware, (req, res, next) => {
    console.log('Authenticated user:', req.user); // Log the authenticated user
    next();
  }, reviewRoutes);


  // Use the authMiddleware and then the contactRoutes for the /contact route
app.use('/contact', authMiddleware, (req, res, next) => {
    console.log('Authenticated user:', req.user); // Debugging: check the authenticated user
    next();
  }, contactRoutes);

  
// ✅ Financial Profile Input Route
app.get('/input', authMiddleware, (req, res) => {
    res.render('input', { user: req.user });
});

// ✅ Protect Home Route
app.get('/home', authMiddleware, async (req, res) => {
    try {
      const profile = await Profile.findOne({ userId: req.user._id });
      res.render('home', { user: req.user, profile });
    } catch (err) {
      console.error('Error loading profile:', err);
      res.status(500).send('Internal Server Error');
    }
  });

// Start server
app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
