import React, { useState } from 'react';

import './App.css';
import TransactionsTable from './components/TransactionsTable';

function App() {

  const [month, setMonth] = useState(3);
  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
  };

  return (
    <div>
      <h1>Product Dashboard</h1>
      <label>
        Select Month:
        <select value={month} onChange={handleMonthChange}>
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </label>
      <TransactionsTable selectedMonth={month} /> 
    </div>
  );
}

export default App;
