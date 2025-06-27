const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
  let username = req.query.username || 'Guest';
  console.log(`Username: ${username}`);
  console.log(`Method: ${req.method} URL: ${req.url}`)
  // res.send('Users Route for user: ' + username);
  // res.contentType('text/plain');
  res.send(users);
});

router.get('/home', (req, res) => {
  // console.log(req.query);
  console.log(`Method: ${req.method} URL: ${req.url}`)
  res.send('Users/Home Route');
});

router.get('/:id', (req, res) => {
  console.log(req.params);
  console.log(`User ID: ${parseInt(req.params.id) + 1}`);
  console.log(`Method: ${req.method} URL: ${req.url}`)

  const userObj = users.find((u) => u.id === parseInt(req.params.id));

  res.send(userObj || {} );
});

router.use((req, res) => {
  console.log(`Method: ${req.method} URL: ${req.url}`)
  res.status(404).send({
    error: `Users '${req.method}: ${req.url}' Route Not Found`,
    status: 404
  });
});

module.exports = router;