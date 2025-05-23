const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings } = require('../controllers/bookingController');
router.post('/createBooking', createBooking);
router.get('/allBookings', getAllBookings); // new route
module.exports = router;