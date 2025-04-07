import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/products');
      const data = await res.json();
      console.log(data);
      setProducts(data.data); // assuming `data.data` holds your products
    } catch (err) {
      console.error('Failed to fetch products:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err.message);
    }
  };

  // Inline styles
  const styles = {
    productList: {
      display: 'flex',
      flexWrap:'wrap',
      gap: '20px',
      padding: '30px',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      width:'100vw'
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '15px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      transition: 'transform 0.2s ease',
      width:"25%",
      height:'460px'
    },
    cardImg: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '10px',
    },
    deleteBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background 0.3s ease',
    },
  };
 useEffect(()=>{
  fetchProducts()
 },[])
  return (
    <div style={styles.productList}>
      {products.map((product) => (
        <div key={product._id} style={styles.card}>
          <img src={product.image} alt={product.name} style={styles.cardImg} />
          <h4>{product.name}</h4>
          <p>Price: ₹{product.price}</p>
          <p>Category: {product.category}</p>
          <button
            style={styles.deleteBtn}
            onClick={() => handleDelete(product._id)}
            onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
