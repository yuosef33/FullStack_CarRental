const mongoose = require('mongoose');

const serviceBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  carModel: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: String,
    required: true
  },

  problemDescription: {
    type: String,
    required: true
  },

  day: {
    type: String,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ServiceBooking', serviceBookingSchema);
