const express = require("express");
const { createBooking, getUserBookings ,getAllBookings} = require("../controller/booking.controller");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Create a booking (POST) - Requires authentication
router.post("/create", authenticateUser, createBooking);

// ✅ Get logged-in user's bookings (GET) - Requires authentication
router.get("/", authenticateUser, getUserBookings);
router.get("/all",  getAllBookings);


module.exports = router;
