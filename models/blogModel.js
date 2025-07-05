const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the blog post
    content: { type: String, required: true }, // Content of the blog post
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the post
    createdAt: { type: Date, default: Date.now }, // Timestamp of when the post was created
    status: { type: String, default: 'pending' } // Status of the blog post (e.g., draft, published)
});

const BlogModel = mongoose.model('Blog', blogSchema); // Create a model from the schema
module.exports = BlogModel; // Export the model for use in other parts of the application