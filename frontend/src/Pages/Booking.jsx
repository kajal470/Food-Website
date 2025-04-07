import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaCalendarAlt } from 'react-icons/fa';

function Booking() {
  const [bookings, setBookings] = useState([]);

  const styles = {
    page: {
      width: '78vw',
      margin: '0 auto',
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f6f9',
      minHeight: '100vh',
      boxSizing: 'border-box',
    },
    heading: {
      fontSize: '30px',
      marginBottom: '20px',
      color: '#222',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
    },
    bookingCard: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    cardText: {
      lineHeight: '1.7',
      color: '#444',
      marginBottom: '15px',
    },
    deleteBtn: {
      backgroundColor: '#ff4d4d',
      border: 'none',
      padding: '10px 14px',
      color: '#fff',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      alignSelf: 'flex-start',
    },
    deleteAllBtn: {
      backgroundColor: '#dc3545',
      border: 'none',
      padding: '12px 20px',
      color: '#fff',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '30px',
      fontWeight: 'bold',
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/bookings/all');
      setBookings(res.data.bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err.message);
    }
  };

  const deleteBooking = (id) => {
    const updated = bookings.filter((b) => b._id !== id);
    setBookings(updated);
  };

  const deleteAllBookings = () => {
    setBookings([]);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}><FaCalendarAlt /> My Bookings</h2>

      {bookings.length > 0 && (
        <button style={styles.deleteAllBtn} onClick={deleteAllBookings}>
          Delete All Bookings
        </button>
      )}

      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <div style={styles.gridContainer}>
          {bookings.map((booking) => (
            <div key={booking._id} style={styles.bookingCard}>
              <div style={styles.cardText}>
                <div><strong>Name:</strong> {booking.name}</div>
                <div><strong>Email:</strong> {booking.email}</div>
                <div><strong>Phone:</strong> {booking.phone}</div>
                <div><strong>Date:</strong> {booking.date}</div>
                <div><strong>Time:</strong> {booking.time}</div>
                <div><strong>Guests:</strong> {booking.guests}</div>
              </div>
              <button style={styles.deleteBtn} onClick={() => deleteBooking(booking._id)}>
                <FaTrash /> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Booking;
