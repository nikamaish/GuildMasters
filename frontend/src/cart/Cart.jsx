// Cart.jsx

import React from 'react';

const Cart = ({ cartItems = [] }) => {
  console.log('Cart component received cartItems:', cartItems);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <span>{item.name}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
