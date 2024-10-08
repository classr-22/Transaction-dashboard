import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarChartComponent = ({month}) => {
  const [barChartData, setBarChartData] = useState([]);

  // Fetch bar chart data when the component mounts
  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/barchart`, {
          params: {
            month: month,
          },
        });
        setBarChartData(response.data.priceRanges); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchBarChartData();
  }, [month]); // Run effect only once when component mounts

  // Check if barChartData has items before rendering
  if (!barChartData || barChartData.length === 0) {
    return <div>No data available</div>; // Handle case when data is empty
  }

  return (
    <div>
        <h2>Bar chart</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price Range</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Count</th>
          </tr>
        </thead>
        <tbody>
          {barChartData.map((item, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              {item._id !== "901+" 
              ? 
                (item._id==0) ? `${item._id}---${item._id+100}` : `${item._id}---${item._id+99}`
              : 
                item._id}
                </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BarChartComponent;