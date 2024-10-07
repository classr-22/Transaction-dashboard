import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchTransactions = async () => {
      try {
        console.log("hii")
      
        const response = await axios.get('http://localhost:3000/api/products/transactions');
        setTransactions(response.data.products); 
      } catch (error) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
    <h2>Transactions</h2>
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
