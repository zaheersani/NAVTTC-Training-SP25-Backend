const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction

// Import required routers
const usersRouter = require('./router/users'); // Import users router
const productsRouter = require('./router/products'); // Import products router
const globalRouter = require('./router/global'); // Import global router
const authRouter = require('./router/auth'); // Import authentication router

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

const CatSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Define schema for Cat with a required name field
  breed: { type: String }, // Define schema for Cat with a required breed field
  age: { type: Number} // Define schema for Cat with a required age field
});

const CatModel = mongoose.model('Cat', CatSchema); // Create Cat model from the schema

app.post('/testcat', (req, res) => {
  const kitty = new CatModel({ 
    name: 'Zildjian',
    breed: 'Persian',
    age: 2
  });
  kitty.save().then(() => console.log('meow'));
  res.status(201).send({
    message: 'Cat created successfully',
    status: 201
  });
});

app.post('/cats', async (req, res) => {
  const { name, breed, age } = req.body; // Extract cat name from request body
  if (!name) {
    return res.status(400).send({
      error: 'Cat name is required',
      status: 400
    });
  }

  try {
    const cat = new CatModel({ name, breed, age }); // Create a new Cat instance
    await cat.save(); // Save the cat to the database
    res.status(201).send(cat); // Send the created cat as response
  } catch (err) {
    console.error('Error saving cat:', err.message);
    res.status(500).send({
      error: 'Internal Server Error',
      status: 500
    });
  }
});

app.get('/cats', async (req, res) => {
  try {
    const cats = await CatModel.find(); // Fetch all cats from the database
    res.status(200).send(cats); // Send the list of cats as response
  } catch (err) {
    console.error('Error fetching cats:', err.message);
    res.status(500).send({
      error: 'Internal Server Error',
      status: 500
    });
  }
});

app.get('/cats/:id', async (req, res) => {
  const { id } = req.params; // Extract cat ID from request parameters
  try {
    const cat = await CatModel.findById(id); // Find cat by ID
    if (!cat) {
      return res.status(404).send({
        error: 'Cat not found',
        status: 404
      });
    }
    res.status(200).send(cat); // Send the found cat as response
  } catch (err) {
    console.error('Error fetching cat:', err.message);
    res.status(500).send({
      error: 'Internal Server Error',
      status: 500
    });
  }
});

app.get('/cats/breed/:breed', async (req, res) => {
  let { breed } = req.params; // Extract breed from request parameters
  try {
    const cats = await CatModel.find({ breed }); // Find cats by breed
    if (cats.length === 0) {
      return res.status(404).send({
        error: 'No cats found for this breed',
        status: 404
      });
    }
    res.status(200).send(cats); // Send the list of cats of the specified breed as response
  } catch (err) {
    console.error('Error fetching cats by breed:', err.message);
    res.status(500).send({
      error: 'Internal Server Error',
      status: 500
    });
  }
});

app.put('/cats/:id', async (req, res) => {
  const { id } = req.params; // Extract cat ID from request parameters
  const { name, breed, age } = req.body; // Extract cat details from request body

  try {
    const cat = await CatModel.findByIdAndUpdate(id, { name, breed, age }, { new: true }); // Update cat details
    if (!cat) {
      return res.status(404).send({
        error: 'Cat not found',
        status: 404
      });
    }
    res.status(200).send(cat); // Send the updated cat as response
  } catch (err) {
    console.error('Error updating cat:', err.message);
    res.status(500).send({
      error: 'Internal Server Error',
      status: 500
    });
  }
});
app.delete('/cats/:id', async (req, res) => {
  const { id } = req.params; // Extract cat ID from request parameters
  try {
    const cat = await CatModel.findByIdAndDelete(id); // Delete cat by ID
    if (!cat) {
      return res.status(404).send({
        error: 'Cat not found',
        status: 404
      });
    }
    res.status(200).send({
      message: 'Cat deleted successfully',
      status: 200
    }); // Send success message as response
  } catch (err) {
    console.error('Error deleting cat:', err.message);
    res.status(500).send({
      error: 'Internal Server Error',
      status: 500
    });
  }
});


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
