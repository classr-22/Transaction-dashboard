import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsList = ({ month }) => {
  
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
 
  const API_URL = 'http://localhost:3000/api/products/statistics'; 

 
  const fetchStatistics = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          month: month, 
        },
      });
      setStatistics(response.data);
    } catch (error) {
      setError('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [month]); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Transaction Statistics</h2>
      <div>
        <p>Total Amount of Sales: ${statistics.totalSaleAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default TransactionsList;
