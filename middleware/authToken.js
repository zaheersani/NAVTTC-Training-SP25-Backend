const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const authToken = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1]; // Extract token from Authorization header
  console.log(`Authorization header: ${token}`);
  if (!token) {
    return res.status(401).send({
      error: 'No token provided',
      status: 401
    });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        error: 'Failed to authenticate token',
        status: 500
      });
    }
    console.log(`Decoded token: ${JSON.stringify(decoded)}`);
    // Save decoded information to request object
    // req.user = decoded;
    next();
  });
};

module.exports = authToken;