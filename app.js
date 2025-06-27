const express = require('express'); // Import Express framework

/**
 * Import required modules
 */
const usersRouter = require('./router/users'); // Import users router
const productsRouter = require('./router/products'); // Import products router
const auth = require('./middleware/auth'); // Import authentication middleware

const app = express(); // Create Express app instance

// Express middleware to parse JSON bodies
app.use(express.json());

// Logging middleware and block POST /users requests
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  if(req.method === 'POST' && req.url === '/users') {
    res.status(400).send({
      error: 'POST requests to /users are not allowed',
      status: 400
    });
  }
  next();
});

// Middleware to log the current time for each request
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toISOString()}`);
  next();
});

// Middleware to optionally skip authentication for GET /
const skipauth = (req, res, next) => {
  if (req.url === '/' && req.method === 'GET')
    req.skipauth = true;
  console.log('Skipping authentication for this route');
  next();
}

// Mount users router with authentication middleware
app.use('/users', auth, usersRouter);

// Mount products router with skipauth and authentication middleware
app.use('/products', skipauth, auth, productsRouter);

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
app.get('/', middleware2, middleware, (req, res, next) =>
  res.send('Hello World!')
);

// Route for GET /home, uses middleware
app.get('/home', middleware, (req, res) =>
  res.send('Home Route')
);

// Route for GET /about
app.get('/about', (req, res) =>
  res.send('About Route')
);

// Route for GET /contact
app.get('/contact', (req, res) =>
  res.send('Contact Route')
);

// Catch-all route for 404 errors
// Global Middleware
app.use((req, res) => {
  console.log(`Method: ${req.method} URL: ${req.url}`)
  res.status(404).send({
    error: 'Page Not Found',
    status: 404
  });
});

// Start the server on port 3000
app.listen(3000, () => 
  console.log('Listening on port 3000'));
