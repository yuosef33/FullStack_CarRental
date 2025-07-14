const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  available: { type: Boolean, default: true },
  imageUrl: { type: String, default: '' },
  type: {
    type: String,
    required: true,
    enum: ['Luxury', 'Sports', 'SUV', 'Classic', 'Business', 'Electric (EV)', 'VAN']
  },
  acceleration: {
    type: Number, 
    required: false
  },
  hp: {
    type: Number,
    required: false
  },
  tank: {
    type: Number, 
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);
