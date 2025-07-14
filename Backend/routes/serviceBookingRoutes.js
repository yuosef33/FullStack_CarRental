const express = require('express');
const router = express.Router();
const { createServiceBooking, getAllServiceBookings } = require('../controllers/serviceBookingController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


router.post('/', createServiceBooking);


router.get('/all', authMiddleware, adminMiddleware, getAllServiceBookings);

module.exports = router;

