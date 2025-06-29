const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken'); // Import token authentication middleware
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Dummy authentication logic
  if (username === 'user' && password === 'pass') {
    const token = jwt.sign(
      { username: username, program: "NAVTTC" }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    console.log(`Generated token: ${token}`);
    res.json({ token });
  }
  else {
    res.status(401).send({
      error: 'Invalid credentials',
      status: 401
    });
  }
});

router.get('/protected', authToken, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;