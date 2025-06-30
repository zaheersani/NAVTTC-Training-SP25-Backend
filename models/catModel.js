const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB

const CatSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Define schema for Cat with a required name field
  breed: { type: String }, // Define schema for Cat with a required breed field
  age: { type: Number} // Define schema for Cat with a required age field
});

const CatModel = mongoose.model('Cat', CatSchema); // Create Cat model from the schema

module.exports = CatModel; // Export the Cat model for use in other files