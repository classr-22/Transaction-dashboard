// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controller/productController.js');

// Route for initializing the database
router.get('/initialize-database',productController.initializeDatabase);

module.exports = router;
