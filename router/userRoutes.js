const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.find({ email });
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user[0].password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        jwt.sign(
            { id: user[0]._id, email: user[0].email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    return res.status(500).json({ message: 'Error generating token' });
                }
                res.json({ token });
            }
        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    try {
        const newUser = await user.save();
        // Exclude password from the response
        const userObj = newUser.toObject();
        delete userObj.password;
        res.status(201).json(userObj);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;