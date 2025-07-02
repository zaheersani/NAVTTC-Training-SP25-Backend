// const express = require('express');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authUser = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        console.log('Decoded token:', decoded); // Log the decoded token for debugging
        req.user = decoded; // Attach user info to request object
        // req.user = await UserModel.findById(decoded.id).select('-password'); // Fetch user without password
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authUser; // Export the middleware for use in other files