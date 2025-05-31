const express = require('express');
const app = express();

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Eve' },
  { id: 6, name: 'Frank' },
  { id: 7, name: 'Grace' },
  { id: 8, name: 'Heidi' },
  { id: 9, name: 'Ivan' },
  { id: 10, name: 'Judy' }
]

app.get('/', (req, res) =>
  res.send('Hello World!')
);

app.get('/home', (req, res) =>
  res.send('Home Route')
);

app.get('/users', (req, res) => {
  let username = req.query.username || 'Guest';
  console.log(`Username: ${username}`);
  console.log(`Method: ${req.method} URL: ${req.url}`)
  // res.send('Users Route for user: ' + username);
  // res.contentType('text/plain');
  res.send(users);
});

app.get('/users/home', (req, res) => {
  // console.log(req.query);
  console.log(`Method: ${req.method} URL: ${req.url}`)
  res.send('Users/Home Route');
});

app.get('/users/:id', (req, res) => {
  console.log(req.params);
  console.log(`User ID: ${parseInt(req.params.id) + 1}`);
  console.log(`Method: ${req.method} URL: ${req.url}`)

  const userObj = users.find((u) => u.id === parseInt(req.params.id));

  res.send(userObj || {} );
});

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
