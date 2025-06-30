const express = require('express'); // Import express to create a router
const catController = require('../controllers/catController'); // Import cat controller

const router = express.Router(); // Create a new router instance

router.post('/', catController.createCat); // Route to create a new cat using the controller function

router.get('/', catController.getAllCats); // Route to get all cats using the controller function

router.get('/:id', catController.getCatByID); // Route to get a cat by ID using the controller function

router.get('/breed/:breed', catController.getCatbyBreed); // Route to get cats by breed using the controller function

router.put('/:id', catController.updateCat); // Route to update a cat by ID using the controller function

router.delete('/:id', catController.deleteCat); // Route to delete a cat by ID using the controller function

module.exports = router; // Export the router for use in other files
