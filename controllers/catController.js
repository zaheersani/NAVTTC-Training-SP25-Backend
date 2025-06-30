const CatModel = require('../models/catModel'); // Import Cat model from models directory

exports.createCat = async (req, res) => {
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
}

exports.getAllCats = async (req, res) => {
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
}

exports.getCatByID = async (req, res) => {
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
}

exports.getCatbyBreed = async (req, res) => {
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
}

exports.updateCat = async (req, res) => {
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
}

exports.deleteCat = async (req, res) => {
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
}