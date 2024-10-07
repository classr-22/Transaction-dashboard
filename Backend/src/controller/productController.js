// controllers/productController.js

const axios = require('axios');
const Product = require('../models/productSchema.js'); // Assuming you have a Product model defined

exports.initializeDatabase = async (req, res) => {
  try {
    
    // Fetching data from the third-party API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    console.log("Product Model:", Product);

    const productData = response.data;
    //console.log('Fetched Product Data:', productData); 
    // Insert the fetched data into the database
    await Product.insertMany(productData);

    res.status(200).json({ message: 'Database initialized with seed data' });
  } catch (error) {
    console.error('Error while initializing database:', error);
    res.status(500).json({ message: 'Failed to initialize database', error });
  }
};
