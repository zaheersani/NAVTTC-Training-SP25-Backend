const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction

// Import required routers
const usersRouter = require('./router/users'); // Import users router
const productsRouter = require('./router/products'); // Import products router
const globalRouter = require('./router/global'); // Import global router
const authRouter = require('./router/auth'); // Import authentication router
const catRoutes = require('./router/catRoutes'); // Import cat routes
const studentRoutes = require('./router/studentRoutes'); // Import student routes

// Import middleware
const skipauth = require('./middleware/skipauth'); // Import skip authentication middleware
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

app.use('/auth', authRouter); // Mount authentication router at /auth path
app.use('/', globalRouter); // Mount global router at root path
app.use('/users', auth, usersRouter); // Mount users router with authentication middleware
app.use('/products', skipauth, auth, productsRouter); // Mount products router with skipauth and authentication middleware
app.use('/cats', catRoutes); // Mount cat routes
app.use('/students', studentRoutes); // Mount student routes


mongoose.connect('mongodb://localhost:27017/catdatabase', { // Connect to MongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Catch-all route for 404 errors
// Global Middleware
app.use((req, res) => {
  console.log(`Method: ${req.method} URL: ${req.url}`)
  res.status(404).send({
    error: 'Page Not Found',
    status: 404
  });
});

app.use((err, req, res, next) => {
  console.error(`Error occurred: ${err.message}`);
  res.status(500).send({
    message: err.message,
    error: 'Internal Server Error',
    status: 500
  });
});

// Start the server on port 3000
app.listen(3000, () => 
  console.log('Listening on port 3000'));
