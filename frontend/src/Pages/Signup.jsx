import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [signedUp, setSignedUp] = useState(false); // ✅ State to trigger re-render
    const navigate = useNavigate(); 

    // Handle input change
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle signup
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3000/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            // ✅ Store user data
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.user);

            // ✅ Trigger Re-render & Navigation
            setSignedUp(true);
            alert("Signup Sucessfully..")

            setTimeout(() => {
                navigate("/");
            }, 1000);
            
        } catch (err) {
            setError(err.message);
            toast.error(err.message, { position: "top-right", autoClose: 2000 });
        }

        setLoading(false);
    };

    return (
        <>
            <Navbar key={signedUp} /> {/* ✅ Key forces re-render after signup */}

            <div style={{ marginTop: "10rem" }}>
                <div style={styles.container}>
                    <h2 style={styles.heading}>Sign Up</h2>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            style={styles.input}
                        />
                        <button type="submit" disabled={loading} style={styles.button}>
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>

                    {error && <p style={styles.error}>{error}</p>}

                    {/* Already have an account? Login */}
                    <span style={styles.loginText}>
                        Already have an account?{" "}
                        <Link to="/login" style={styles.loginLink}>Login</Link>
                    </span>
                </div>
            </div>

            <Footer />
        </>
    );
};

// Inline CSS styles
const styles = {
    container: {
        width: "350px",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        margin: "50px auto",
    },
    heading: {
        marginBottom: "15px",
        fontSize: "22px",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        fontSize: "16px",
    },
    button: {
        background: "#ff6600",
        color: "#fff",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        fontSize: "18px",
        cursor: "pointer",
        transition: "0.3s",
    },
    error: {
        color: "red",
        fontSize: "14px",
        marginTop: "10px",
    },
    loginText: {
        marginTop: "15px",
        fontSize: "14px",
        color: "#555",
        display: "block",
    },
    loginLink: {
        color: "#ff6600",
        textDecoration: "none",
        fontWeight: "bold",
    },
};

export default Signup;
