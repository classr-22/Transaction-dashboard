

const axios = require('axios');
const Product = require('../models/productSchema.js'); 

exports.initializeDatabase = async (req, res) => {
  try {
    
   
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    

    const productData = response.data;
    
    await Product.insertMany(productData);

    res.status(200).json({ message: 'Database initialized with seed data' });
  } catch (error) {
    console.error('Error while initializing database:', error);
    res.status(500).json({ message: 'Failed to initialize database', error });
  }
};




exports.getTransactions = async (req, res) => {
  const { search, month, page = 1, perPage = 10, minPrice, maxPrice } = req.query; 

  const pageNum = parseInt(page);
  const perPageNum = parseInt(perPage);

  const searchCriteria = {};
  
 
  if (search) {
    const searchRegex = new RegExp(search, 'i'); 
    searchCriteria.$or = [
      { title: searchRegex },       
      { description: searchRegex }, 
    ];
  }

  
  if (minPrice) {
    searchCriteria.price = { $gte: parseFloat(minPrice) };
  }
  
  if (maxPrice) {
    searchCriteria.price = { ...searchCriteria.price, $lte: parseFloat(maxPrice) }; 
  }

  
  if (month) {
    searchCriteria.$expr = {
      $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
    };
  }

  try {
    const products = await Product.find(searchCriteria) 
      .skip((pageNum - 1) * perPageNum) 
      .limit(perPageNum); 

    const totalCount = await Product.countDocuments(searchCriteria); 

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


exports.getStatisticsByMonth = async (req, res) => {
  try {
    const { month } = req.query;

    
    if (!month) {
      return res.status(400).json({ message: 'Please provide the month.' });
    }

    
    const selectedMonth = parseInt(month);

   
    const monthFilter = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] }
    };

    
    const soldItems = await Product.find({
      sold: true,
      ...monthFilter
    });

    
    const notSoldItems = await Product.find({
      sold: false,
      ...monthFilter
    });

    
    const totalSaleAmount = soldItems.reduce((total, item) => total + item.price, 0);

    const totalSoldItems = soldItems.length;
    const totalNotSoldItems = notSoldItems.length;

    res.status(200).json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error('Error while fetching statistics:', error);
    res.status(500).json({ message: 'Failed to fetch statistics', error });
  }
};


exports.getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'Please provide the month.' });
    }

    const selectedMonth = parseInt(month);

    const monthFilter = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] }
    };

 
    const priceRanges = await Product.aggregate([
      { $match: monthFilter }, 
      {
        $bucket: {
          groupBy: "$price", 
          boundaries: [0, 101, 201, 301, 401, 501, 601, 701, 801, 901], 
          default: "901+", 
          output: {
            count: { $sum: 1 } 
          }
        }
      }
    ]);

   
    res.status(200).json({
      month: selectedMonth,
      priceRanges
    });
  } catch (error) {
    console.error('Error while fetching bar chart data:', error);
    res.status(500).json({ message: 'Failed to fetch bar chart data', error });
  }
};

exports.getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'Please provide the month.' });
    }

    const selectedMonth = parseInt(month);

    const monthFilter = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] }
    };

    const categoryData = await Product.aggregate([
      { $match: monthFilter },
      {
        $group: {
          _id: "$category",  
          count: { $sum: 1 } 
        }
      }
    ]);

    res.status(200).json({
      month: selectedMonth,
      categoryData
    });
  } catch (error) {
    console.error('Error while fetching pie chart data:', error);
    res.status(500).json({ message: 'Failed to fetch pie chart data', error });
  }
};

exports.getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'Please provide the month.' });
    }

    
    const baseUrl = 'http://localhost:3000/api/products';
    const statisticsUrl = `${baseUrl}/statistics?month=${month}`;
    const barChartUrl = `${baseUrl}/barchart?month=${month}`;
    const pieChartUrl = `${baseUrl}/piechart?month=${month}`;

   
    const [statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
      axios.get(statisticsUrl),  
      axios.get(barChartUrl),    
      axios.get(pieChartUrl)     
    ]);

    
    const statisticsData = statisticsResponse.data;
    const barChartData = barChartResponse.data;
    const pieChartData = pieChartResponse.data;

   
    const combinedData = {
      statistics: statisticsData,
      barChart: barChartData,
      pieChart: pieChartData
    };

   
    res.status(200).json(combinedData);
  } catch (error) {
    console.error('Error while fetching combined data:', error);
    res.status(500).json({ message: 'Failed to fetch combined data', error });
  }
};