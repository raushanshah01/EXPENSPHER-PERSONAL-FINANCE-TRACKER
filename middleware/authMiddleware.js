const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).redirect('/login');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) return res.status(401).redirect('/login');

        next();
    } catch (error) {
        console.error(error);
        res.status(401).redirect('/login');
    }
};
