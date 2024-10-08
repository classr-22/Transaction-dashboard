import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsList = ({month}) => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(10); 
  const [minPrice, setMinPrice] = useState(''); 
  const [maxPrice, setMaxPrice] = useState('');

  const fetchTransactions = async (query = '', page = 1,minPriceValue = '', maxPriceValue = '') => {
    try {
      
      const response = await axios.get('http://localhost:3000/api/products/transactions', {
        params: {
          month: month,
          search: query,
          page: page,
          perPage: perPage, 
          minPrice: minPriceValue, 
          maxPrice: maxPriceValue, 
        },
      });
      
      setTransactions(response.data.products);
      setTotalPages(response.data.totalPages); 
    } catch (error) {
      console.log('Failed to fetch transactions');
    }
  };

  useEffect(() => {
    fetchTransactions(searchQuery, currentPage, minPrice, maxPrice); 
  }, [month, searchQuery, currentPage,minPrice, maxPrice]); 

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1); 
    fetchTransactions(query, 1); 
  };

  const handleMinPriceChange = (event) => {
    const value = event.target.value;
    setMinPrice(value);
    setCurrentPage(1); 
    fetchTransactions(searchQuery, 1, value, maxPrice); 
  };

 
  const handleMaxPriceChange = (event) => {
    const value = event.target.value;
    setMaxPrice(value);
    setCurrentPage(1); 
    fetchTransactions(searchQuery, 1, minPrice, value); 
  };

  const handleNextPage = () => {
    
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h2>Transactions</h2>
      <input
        type="text"
        placeholder="Search by title, description...."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px', padding: '8px', width: '100%' }}
      />

<div style={{ marginBottom: '16px' }}>
        <label>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            style={{ marginLeft: '8px', padding: '8px' }}
          />
        </label>
        <label style={{ marginLeft: '16px' }}>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            style={{ marginLeft: '8px', padding: '8px' }}
          />
        </label>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Sold</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
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
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><img width="40" height="40" src={transaction.image}></img></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '16px' }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: '0 8px' }}> {(totalPages===0)? `Page ${currentPage} of 1` : `Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages===0}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsList;
