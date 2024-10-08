import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarChartComponent = () => {
  const [barChartData, setBarChartData] = useState([]);

  // Fetch bar chart data when the component mounts
  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/barchart`, {
          params: {
            month: 9,
          },
        });
        setBarChartData(response.data.priceRanges); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchBarChartData();
  }, []); // Run effect only once when component mounts

  // Check if barChartData has items before rendering
  if (!barChartData || barChartData.length === 0) {
    return <div>No data available</div>; // Handle case when data is empty
  }

  return (
    <div>
        <h2>Bar chart</h2>
      <p>{barChartData[0]._id}</p> {/* Access _id safely now */}
    </div>
  );
}

export default BarChartComponent;