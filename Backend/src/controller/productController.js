// controllers/productController.js

const axios = require('axios');
const Product = require('../models/productSchema.js'); // Assuming you have a Product model defined

exports.initializeDatabase = async (req, res) => {
  try {
    
    // Fetching data from the third-party API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    

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


// src/controllers/productController.js

exports.getTransactions = async (req, res) => {
  const { search, page = 1, perPage = 10, minPrice, maxPrice } = req.query; // Destructure search, page, perPage, minPrice, and maxPrice from the query

  // Convert page and perPage to numbers
  const pageNum = parseInt(page);
  const perPageNum = parseInt(perPage);

  // Build search criteria
  const searchCriteria = {};
  
  if (search) {
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive regex
    searchCriteria.$or = [
      { title: searchRegex },       // Match title
      { description: searchRegex }, // Match description
    ];
  }

  // Add price range filtering
  if (minPrice) {
    searchCriteria.price = { $gte: parseFloat(minPrice) }; // Minimum price
  }
  
  if (maxPrice) {
    searchCriteria.price = { ...searchCriteria.price, $lte: parseFloat(maxPrice) }; // Maximum price
  }

  try {
    const products = await Product.find(searchCriteria) // Fetch products based on search criteria
      .skip((pageNum - 1) * perPageNum) // Skip the records of previous pages
      .limit(perPageNum); // Limit the results per page

    const totalCount = await Product.countDocuments(searchCriteria); // Count total matching documents

    res.status(200).json({
      page: pageNum,
      perPage: perPageNum,
      totalCount,
      totalPages: Math.ceil(totalCount / perPageNum),
      products
    });
  } catch (error) {
    console.error('Error while fetching transactions:', error);
    res.status(500).json({ message: 'Failed to fetch transactions', error });
  }
};
