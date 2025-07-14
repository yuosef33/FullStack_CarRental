const express = require('express');
const router = express.Router();
const { makeReservation ,getUserReservations,deleteReservation,getAllReservations,updateReservationStatus } = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


router.post('/', authMiddleware, makeReservation);

router.get('/my', authMiddleware, getUserReservations);


router.delete('/:id', authMiddleware, deleteReservation);


router.get('/all', authMiddleware, adminMiddleware, getAllReservations);


router.patch('/:id/status', authMiddleware, adminMiddleware, updateReservationStatus);
module.exports = router;


