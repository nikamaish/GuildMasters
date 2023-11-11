import React from 'react';

const Cart = ({ cartItems }) => {
  console.log('Cart component rendered with cartItems:', cartItems);
  if (!cartItems ) {
    return <p>No items in the cart.</p>;
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
