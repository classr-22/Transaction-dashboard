import React from 'react';

const TransactionsTable = ({ selectedMonth }) => {

  const sampleData = [
    {
      id: 1,
      title: 'Item 1',
      description: 'Description for item 1',
      price: 100,
      category: 'Category A',
      sold: true,
      dateOfSale: '2024-10-01',
    },
    {
      id: 2,
      title: 'Item 2',
      description: 'Description for item 2',
      price: 200,
      category: 'Category B',
      sold: false,
      dateOfSale: '2024-10-02',
    },
    // Add more sample items as needed
  ];

  return (
    <div>
      <h2>Transactions Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.sold ? 'Yes' : 'No'}</td>
              <td>{item.dateOfSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
