import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/product/productSlice";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  console.log(products)

  // Fetch dynamic products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredMenu =
    selectedCategory === "all"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      toast.error("You need to register or log in to add items to the cart!", {
        position: "top-right",
      });
      return;
    }
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart! 🛒`, {
      position: "top-right",
    });
  };
  const categories = ['all', ...new Set(products.map(product=>product.category))]
  return (
    <>
      <Navbar />
      <ToastContainer />
      <section className="menu">
        <h1>Our Menu</h1>
        <p>Delicious meals made with fresh ingredients</p>
      
        {/* Filter Buttons */}
        <div className="menu-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="menu-items">
          {filteredMenu.map((item) => (
            <div key={item._id} className={`menu-item ${item.category}`}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Rs. {item.price}</p>
              <button
                onClick={() => handleAddToCart(item)}
                style={{
                  background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "0.3s ease",
                  fontWeight: "bold"
                }}
                onMouseOver={(e) => e.target.style.background = "linear-gradient(90deg, #feb47b, #ff7e5f)"}
                onMouseOut={(e) => e.target.style.background = "linear-gradient(90deg, #ff7e5f, #feb47b)"}
              >
                Add to Cart 🛒
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Menu;
