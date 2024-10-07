

const express = require('express');
const router = express.Router();
const productController = require('../controller/productController.js');


router.get('/initialize-database',productController.initializeDatabase);
router.get('/transactions', productController.getTransactions);
router.get('/statistics', productController.getStatisticsByMonth);
router.get('/barchart', productController.getBarChartData);
router.get('/piechart', productController.getPieChartData);

module.exports = router;
