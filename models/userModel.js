const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Unique email for the user
    password: { type: String, required: true }, // Password for the user
    createdAt: { type: Date, default: Date.now } // Timestamp of when the user was created
});

const UserModel = mongoose.model('User', userSchema); // Create a model from the schema

module.exports = UserModel; // Export the model for use in other parts of the application