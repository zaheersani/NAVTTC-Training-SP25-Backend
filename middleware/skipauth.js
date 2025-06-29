// Middleware to optionally skip authentication for GET /
const skipauth = (req, res, next) => {
  if (req.url === '/' && req.method === 'GET')
    req.skipauth = true;
  console.log('Skipping authentication for this route');
  next();
}

module.exports = skipauth;