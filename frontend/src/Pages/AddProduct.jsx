import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: null,
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/products');
      setProducts(res.data.data);
    } catch (err) {
      console.error('Error fetching products:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('price', form.price);
      formData.append('category', form.category);
      formData.append('image', form.image);

      const res = await axios.post('http://localhost:3000/api/products/', formData);

      console.log(res.data)

      setSuccess('Product added successfully!');
      setForm({ name: '', price: '', category: '', image: null });
      fetchProducts();
    } catch (err) {
      setError('Failed to add product.');
      console.error('Error adding product:', err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const styles = {
    container: {
      width: '78vw',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      fontSize: '28px',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#333',
    },
    message: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '30px',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      background: '#f9f9f9',
    },
    input: {
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      padding: '10px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    productList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '15px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    },
    cardImg: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '10px',
    },
    deleteBtn: {
      marginTop: '10px',
      padding: '8px 12px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Products</h2>

      {success && <p style={{ ...styles.message, color: 'green' }}>{success}</p>}
      {error && <p style={{ ...styles.message, color: 'red' }}>{error}</p>}

      <form style={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Add Product</button>
      </form>

    
    </div>
  );
}



export default AddProduct