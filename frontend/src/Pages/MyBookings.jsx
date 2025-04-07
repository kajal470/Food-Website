import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from localStorage
                if (!token) {
                    setError("You need to log in to see your bookings.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:3000/api/bookings/", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setBookings(response.data.bookings);
                setLoading(false);
            } catch (err) {
                setError("Failed to load bookings. Please try again.");
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <>


        <div className="my-bookings">
            <h2>📅 My Bookings</h2>

            {loading && <p>Loading bookings...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && bookings.length === 0 && (
                <p>No bookings found. Make your first reservation now!</p>
            )}

            {!loading && bookings.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Guests</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking.date}</td>
                                <td>{booking.time}</td>
                                <td>{booking.guests}</td>
                                <td>{booking.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <style>{`
                .my-bookings {
                    max-width: 800px;
                    margin: auto;
                    text-align: center;
                    padding: 20px;
                }

                h2 {
                    color: #ff6600;
                    font-size: 24px;
                    margin-bottom: 20px;
                }

                .error {
                    color: red;
                    font-weight: bold;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th, td {
                    padding: 10px;
                    border: 1px solid #ddd;
                    text-align: center;
                }

                th {
                    background-color: #ff6600;
                    color: white;
                }

                tr:hover {
                    background-color:rgb(1, 2, 10);
                }
            `}</style>

            <Link to='/' >
            <button style={{marginTop:'40px'}}>
            Go Back</button></Link>
        </div>
        </>
    );
};

export default MyBookings;
