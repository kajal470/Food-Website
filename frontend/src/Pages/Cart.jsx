import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import "../Pages/Cart.css"


const Cart = () => {
  const cartItems = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + Number(item.price), 0);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty!</h2>
          <Link to="/menu" className="go-shopping">
            Go to Menu 🍔
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Rs. {item.price}</p>
                </div>
                <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: Rs. {totalPrice}</h2>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
