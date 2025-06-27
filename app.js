const express = require('express');
const app = express();

// Express middleware to parse JSON bodies
app.use(express.json());

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

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toISOString()}`);
  next();
});

const usersRouter = require('./router/users');
const productsRouter = require('./router/products');
const auth = require('./middleware/auth');

const skipauth = (req, res, next) => {
  if (req.url === '/' && req.method === 'GET')
    req.skipauth = true;
  console.log('Skipping authentication for this route');
  next();
}

app.use('/users', auth, usersRouter);
app.use('/products', skipauth, auth, productsRouter);

const middleware = (req, res, next) => {
  console.log('Middleware function executed');
  req.url = '/home'; // Change the URL to '/home'
  next();
}

const middleware2 = (req, res, next) => {
  console.log('Middleware function 2 executed');
  console.log(`Modified URL: ${req.url}`);
  next();
}

app.get('/', middleware2, middleware, (req, res, next) =>
  res.send('Hello World!')
);

app.get('/home', middleware, (req, res) =>
  res.send('Home Route')
);

app.get('/about', (req, res) =>
  res.send('About Route')
);

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

app.listen(3000, () => 
  console.log('Listening on port 3000'));
