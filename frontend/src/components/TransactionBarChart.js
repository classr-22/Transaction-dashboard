import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList
} from 'recharts';

const BarChartComponent = ({ month }) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/barchart`, {
          params: {
            month: month,
          },
        });
        setBarChartData(response.data.priceRanges); 
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchBarChartData();
  }, [month]);

 
  const formattedData = barChartData.map((item) => ({
    priceRange: item._id !== '901+' 
      ? (item._id === 0) ? `${item._id} - ${item._id + 100}` : `${item._id} - ${item._id + 99}`
      : item._id,
    count: item.count,
  }));

  if (formattedData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h2>Bar Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priceRange" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8">
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
