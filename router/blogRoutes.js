const express = require('express');
const BlogModel = require('../models/blogModel');

const router = express.Router();

const authUser = require('../middleware/authUser'); // Import user authentication middleware

// Get all blogs
router.get('/all', async (req, res) => {
    try {
        const blogs = await BlogModel.find( {status: 'approved'} );
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.use(authUser); // Apply user authentication middleware to all routes in this router

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await BlogModel.find( { user: req.user.id } );
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new blog
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    const user = req.user.id; // Assuming user is set by auth middleware
    const blog = new BlogModel({
        title,
        content,
        user
    });
    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// TODO: Implement update and delete routes
// Update a blog by ID for a authenticated user
// Delete a blog by ID for a authenticated user
// Admin routes for managing blogs

module.exports = router;