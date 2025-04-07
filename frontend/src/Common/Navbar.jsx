import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [userName, setUserName] = useState(null);
    const navigate = useNavigate();

    // Get cart items count from Redux
    const cartItems = useSelector((state) => state.product.products);

    // Check if user is authenticated
    const authenticUser = localStorage.getItem("token");
    const email = localStorage.getItem('email')
    
    // Get user's name from localStorage
    useEffect(() => {
        const storedName = localStorage.getItem("name");
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Logout function
    const handleLogout = () => {
       

        // ✅ Remove user data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        alert("Logout Sucessfully")



        setTimeout(() => {
            navigate("/"); // Redirect to home page
            window.location.reload(); // 🔹 Refresh UI after logout
        }, 2000);
    };
 const admins = ['abc@gmail.com','kajalkajal2866@gmail.com'];
    return (
        <nav className="navbar">
            <div className="logo">Foodie's Hub</div>

            {/* Navigation Links */}
            <ul  className={`nav-links  ${isOpen && 'toggle'}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/reservation">Reservation</Link></li>
                 
                <li><Link to="/bookings">My Bookings</Link></li>
                {admins.includes(email) && <li><Link to="/dashboard">Admin</Link></li>}
            </ul>

            {/* Buttons & User Info */}
            <div className="buttons">
                {authenticUser ? (
                    <div 
                        className="profile-container" 
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                        onClick={() => navigate("/profile")} // 👤 Click to open profile page
                    >
                        <div className="profile-avatar">
                            <span role="img" aria-label="avatar">👤</span> {/* Default Avatar */}
                        </div>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <p>👋 Hi, {userName}</p>
                                <hr />
                                <button onClick={handleLogout}>Logout 🚀</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="signin">
                        Log In
                    </Link>
                )}

                <Link to="/cart" className="order">
                    My Cart
                    <span className="cart-count">{cartItems.length}</span>
                </Link>
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="hamburger" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            {/* CSS for styling */}
            <style>{`
                .profile-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    padding: 10px;
                }

                .profile-avatar {
                    font-size: 24px; /* Adjust size */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #ff6600; /* Avatar Background */
                    color: white;
                    font-weight: bold;
                }
                    @media (max-width: 768px) {
                    .toggle{
                      display:none
                    }
            }

                .dropdown-menu {
                    position: absolute;
                    top: 50px;
                    right: 0;
                    background: white;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                    border-radius: 8px;
                    overflow: hidden;
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    width: 180px;
                    padding: 10px;
                    text-align: center;
                }

                .dropdown-menu p {
                    font-weight: bold;
                    color: #333;
                    margin: 5px 0;
                }

                .dropdown-menu hr {
                    border: none;
                    height: 1px;
                    background: #ddd;
                    margin: 8px 0;
                }

                .dropdown-menu button {
                    padding: 8px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: bold;
                    color: #ff4b2b;
                    transition: 0.3s ease;
                }

                .dropdown-menu button:hover {
                    background: #ff4b2b;
                    color: white;
                    border-radius: 5px;
                }

                .order {
                    display: flex;
                    align-items: center;
                    background: white;
                    color: #ff6600;
                    padding: 8px 15px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    transition: 0.3s;
                }

                .cart-count {
                    background: red;
                    color: white;
                    font-size: 12px;
                    padding: 3px 8px;
                    border-radius: 50%;
                    margin-left: 5px;
                    font-weight: bold;
                }
                    
            `}</style>
        </nav>
    );
};

export default Navbar;
