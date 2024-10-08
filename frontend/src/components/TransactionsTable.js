import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsList = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const fetchTransactions = async (query = '') => {

    try {
      const response = await axios.get('http://localhost:3000/api/products/transactions', {
        params: {
          month: month,
          search: query, // Send the search query to the API
        },
      });
      setTransactions(response.data.products);
    } catch (error) {
      console.log('Failed to fetch transactions');
    }
  };

  useEffect(() => {
    fetchTransactions(); 
  }, [month]);

  
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    
    if (query.trim() !== '') {
      fetchTransactions(query); 
    } else {
      fetchTransactions(); 
    }
  };


  return (
    <div>
      <h2>Transactions</h2>
      <input
        type="text"
        placeholder="Search by title, description, or price..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px', padding: '8px', width: '100%' }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Sold</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.description}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>${transaction.price}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.category}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.sold ? 'Yes' : 'No'}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.dateOfSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
