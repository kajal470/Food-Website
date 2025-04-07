import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { Navigate, useNavigate } from "react-router-dom";

const Reservation = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: ""
    });

    const [loading, setLoading] = useState(false);

    const navigate=useNavigate()

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.guests) {
            toast.error("All fields are required!", { position: "top-right" });
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("token"); // Get user token from localStorage

            const response = await fetch("http://localhost:3000/api/bookings/create", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // ✅ Send token for authentication
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Reservation failed");
            }

            toast.success("Reservation successful!", { position: "top-right" });
            setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: "" });
            setTimeout(() => {
                navigate("/")
                
            }, 3000);
            
        } catch (error) {
            toast.error(error.message, { position: "top-right" });
        }

        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <ToastContainer /> {/* ✅ This is needed for toast messages to appear */}
            <section className="reservation-section">
                <div className="reservation-container">
                    <h2>Reserve a Table</h2>
                    <p>Book your table in advance and enjoy a delightful meal with us!</p>
                    <div className="reservation-content">
                        <div className="reservation-form">
                            <h3>Fill in Your Details</h3>
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                                <input type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} required />
                                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                                <select name="guests" value={formData.guests} onChange={handleChange} required>
                                    <option value="" disabled>Number of Guests</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6+">6 or More</option>
                                </select>
                                <button type="submit" disabled={loading}>{loading ? "Reserving..." : "Reserve Now"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Reservation;
