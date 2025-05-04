// src/components/ShoppingList.js

import React, { useState } from 'react';

const ShoppingList = () => {
  const [items] = useState([
    // Example data for initial state
    { name: 'Tomatoes', quantity: '2 lbs' },
    { name: 'Onions', quantity: '1 lb' },
    { name: 'Garlic', quantity: '3 cloves' },
  ]);

  const handleGenerateList = () => {
    // Placeholder for generating list based on recipes
    alert('Shopping list generation coming soon!');
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <button onClick={handleGenerateList}>Generate List</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name} - {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
