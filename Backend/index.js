const express = require('express');
const port = 3000
const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('./src/models/productSchema.js'); 
const productRoutes = require('./src/routes/productRoutes.js');

const app = express();

mongoose.connect('mongodb://localhost:27017/products')
  .then(() => {
    console.log('Connected to the database');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
});


app.use('/api/products', productRoutes);