const express = require('express');

const router = express.Router();

// Dummy products data
const products = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 200 },
];

// Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// Create a new product
router.post('/', (req, res) => {
    const { name, price } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update a product
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const { name, price } = req.body;
    product.name = name || product.name;
    product.price = price || product.price;
    res.json(product);
});

// Delete a product
router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Product not found' });
    const deleted = products.splice(index, 1);
    res.json(deleted[0]);
});

module.exports = router;