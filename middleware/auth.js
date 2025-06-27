
const auth = (req, res, next) => {
    console.log(req.method, req.url);
    if(req.skipauth) {
        console.log('Skipping authentication for this route');
        return next();
    }
    console.log('Authentication middleware executed');
    // Dummy authentication middleware
    req.body = req.body || {};
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    const {username, password} = req.body;
    if (username === 'admin' && password === '123') {
        next();
    } else {
        res.status(401).json({ message: 'Invalid Username or Password' });
    }
};

module.exports = auth;