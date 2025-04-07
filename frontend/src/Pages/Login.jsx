import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // 🔹 Hook for navigation

    // Handle input change
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data)

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // ✅ Store token & username in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("email", data.user.email);

            // ✅ Toast Success Message
            toast.success(`Welcome, ${data.user.name}!`, { position: "top-right", autoClose: 2000 });

            // ✅ Redirect to Home Page after 2 seconds
            setTimeout(() => {
                navigate("/");
                window.location.reload(); // 🔹 Refresh UI after login
            }, 2000);
        } catch (err) {
            setError(err.message);
            toast.error(err.message, { position: "top-right", autoClose: 2000 });
        }

        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <section style={styles.section}>
                <div style={styles.container}>
                    <h2 style={styles.heading}>Login</h2>
                    <form onSubmit={handleSubmit} style={styles.form}>
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
                        <button type="submit" className="button1" style={styles.button} disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {error && <p style={styles.error}>{error}</p>}

                    {/* Sign Up Link */}
                    <p style={styles.signupText}>
                        Don't have an account?{" "}
                        <Link to="/signup" style={styles.signupLink}>Sign up here</Link>
                    </p>
                </div>
            </section>
            <Footer />
        </>
    );
};

// Inline CSS Styles
const styles = {
    section: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        backgroundColor: "#f9f9f9",
    },
    container: {
        width: "350px",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
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
    signupText: {
        marginTop: "15px",
        fontSize: "14px",
        color: "#555",
    },
    signupLink: {
        color: "#ff6600",
        textDecoration: "none",
        fontWeight: "bold",
    },
};

export default Login;
