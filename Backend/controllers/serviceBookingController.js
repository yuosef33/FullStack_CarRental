const ServiceBooking = require('../models/ServiceBooking');


const createServiceBooking = async (req, res) => {
  const { name, carModel, phoneNumber, problemDescription, day } = req.body;


  if (!name || !carModel || !phoneNumber || !problemDescription || !day) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const allowedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (!allowedDays.includes(day)) {
    return res.status(400).json({ message: 'Invalid day selected' });
  }

  try {
    const booking = new ServiceBooking({
      name,
      carModel,
      phoneNumber,
      problemDescription,
      day
    });

    await booking.save();
    res.status(201).json({ message: 'Service booking submitted successfully', booking });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllServiceBookings = async (req, res) => {
    try {
      const bookings = await ServiceBooking.find().sort({ createdAt: -1 });
      res.status(200).json({ bookings });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = {
  createServiceBooking,
  getAllServiceBookings
};
