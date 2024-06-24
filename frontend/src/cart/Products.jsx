import React from "react";
import Cart from './Summary.jsx';

const CartPage = ({ cartItems }) => {
    console.log('Cart Page component received cartItems:', cartItems);
    return (
      <div>
        <h2>Cart Page</h2>
        <Cart cartItems={cartItems} />
        {/* Additional cart-related content */}
      </div>
    );
  };

    export default CartPage;