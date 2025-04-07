const Booking = require("../model/bookingModel.js");

// ✅ Create a new booking (Authenticated users only)
const createBooking = async (req, res) => {
    try {
        const { name, email, phone, date, time, guests } = req.body;
        const userId = req.user.id; // Get logged-in user ID from token

        if (!name || !email || !phone || !date || !time || !guests) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBooking = new Booking({ userId, name, email, phone, date, time, guests });
        await newBooking.save();

        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Get bookings of logged-in user
const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from token
        const bookings = await Booking.find({ userId }); // Fetch only this user's bookings

        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 }); // Latest first

        res.status(200).json({ total: bookings.length, bookings });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports = { createBooking, getUserBookings ,getAllBookings};
