const express = require('express');
const router = express.Router();

// Middleware to modify the request URL to '/home'
const middleware = (req, res, next) => {
  console.log('Middleware function executed');
  req.url = '/home'; // Change the URL to '/home'
  next();
}

// Middleware to log execution and modified URL
const middleware2 = (req, res, next) => {
  console.log('Middleware function 2 executed');
  console.log(`Modified URL: ${req.url}`);
  next();
}
// Route for GET /, uses middleware2 and middleware
router.get('/', middleware2, middleware, (req, res, next) =>
  res.send('Hello World!')
);

// Route for GET /home, uses middleware
router.get('/home', middleware, (req, res) =>
  res.send('Home Route')
);

// Route for GET /about
router.get('/about', (req, res) =>
  res.send('About Route')
);

// Route for GET /contact
router.get('/contact', (req, res) =>
  res.send('Contact Route')
);

module.exports = router;