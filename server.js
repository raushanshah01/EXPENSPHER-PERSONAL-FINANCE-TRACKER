const express = require('express');
const app = express();

// const mongoose = require("mongoose");
const connectDB = require('./config/db');
const sesion = require('express-session');
require('dotenv').config();

connectDB();

const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Define a route for the home page

// Define a route for the login page
app.get('/', (req, res) => {
    res.render('index'); // Render the login.ejs template
});

// Define a route for the register page
app.get('/login', (req, res) => {
    res.render('login'); // Render the register.ejs template
});

app.get('/index/login/register', (req, res) => {
    res.render('register'); // Render the register.ejs template
});

app.get('/register', (req, res) =>{
    res.render('register');
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});