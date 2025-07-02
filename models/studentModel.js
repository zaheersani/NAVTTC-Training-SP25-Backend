const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Define schema for Cat with a required name field
  rollno: { type: String }, // Define schema for Cat with a required breed field
  section: { type: String} // Define schema for Cat with a required age field
});

const StudentModel = mongoose.model('student', StudentSchema); // Create Cat model from the schema

module.exports = StudentModel; // Export the Cat model for use in other files