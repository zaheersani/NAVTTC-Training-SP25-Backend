const express = require('express');
const app = express();

// Express middleware to parse JSON bodies
app.use(express.json());

const usersRouter = require('./users');
const productsRouter = require('./products');

app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.get('/', (req, res) =>
  res.send('Hello World!')
);

app.get('/home', (req, res) =>
  res.send('Home Route')
);

app.get('/about', (req, res) =>
  res.send('About Route')
);

app.get('/contact', (req, res) =>
  res.send('Contact Route')
);

app.use((req, res) => {
  console.log(`Method: ${req.method} URL: ${req.url}`)
  res.status(404).send({
    error: 'Page Not Found',
    status: 404
  });
});

app.listen(3000, () => 
  console.log('Listening on port 3000'));
