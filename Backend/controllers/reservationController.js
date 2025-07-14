const Reservation = require('../models/Reservation');
const Car = require('../models/Car');


const makeReservation = async (req, res) => {
  const { carId, startDate, endDate } = req.body;
  const userId = req.user.userId; 

  try {
  
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    const totalPrice = diffDays * car.pricePerDay;

    const reservation = new Reservation({
      user: userId,
      car: carId,
      startDate,
      endDate,
      totalPrice
    });

    await reservation.save();

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserReservations = async (req, res) => {
    const userId = req.user.userId;
  
    try {
      const reservations = await Reservation.find({ user: userId })
        .populate('car', 'brand model pricePerDay imageUrl type') 
        .sort({ createdAt: -1 });
  
      res.status(200).json({ reservations });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const deleteReservation = async (req, res) => {
    const userId = req.user.userId;
    const reservationId = req.params.id;
  
    try {
      const reservation = await Reservation.findById(reservationId);
  
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
     
      if (reservation.user.toString() !== userId) {
        return res.status(403).json({ message: 'Not authorized to delete this reservation' });
      }
  
      await Reservation.findByIdAndDelete(reservationId);
  
      res.status(200).json({ message: 'Reservation deleted successfully' });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getAllReservations = async (req, res) => {
    try {
      const reservations = await Reservation.find()
        .populate('user', 'name email')
        .populate('car', 'brand model')
        .sort({ createdAt: -1 });
  
      res.status(200).json({ reservations });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const updateReservationStatus = async (req, res) => {
    const reservationId = req.params.id;
    const { status } = req.body;
  
    if (!['confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
  
    try {
      const reservation = await Reservation.findById(reservationId);
      if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
  
      reservation.status = status;
      await reservation.save();
  
      res.status(200).json({ message: `Reservation ${status}` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = { makeReservation,getUserReservations,deleteReservation,getAllReservations,updateReservationStatus };
