import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../features/product/productSlice';
import { FaTrash } from 'react-icons/fa';

function Orders() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.product.products);

  const styles = {
    container: {
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f7f7f7',
      minHeight: '100vh',
      width: '100vw',
    },
    heading: {
      fontSize: '28px',
      marginBottom: '20px',
      color: '#333',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    image: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '15px',
    },
    name: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px',
    },
    price: {
      color: '#888',
      marginBottom: '15px',
    },
    removeBtn: {
      backgroundColor: '#ff4d4d',
      border: 'none',
      padding: '10px 15px',
      color: '#fff',
      borderRadius: '6px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🧾 My Orders</h2>

      {cartItems.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div style={styles.grid}>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div style={styles.name}>{item.name}</div>
              <div style={styles.price}>Rs. {item.price}</div>
              <button
                style={styles.removeBtn}
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <FaTrash style={{ marginRight: '5px' }} />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
