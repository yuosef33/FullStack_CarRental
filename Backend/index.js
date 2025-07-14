require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const carRoutes = require('./routes/carRoutes'); 
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const serviceBookingRoutes = require('./routes/serviceBookingRoutes');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());

app.use(express.json());


app.use('/api/cars', carRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/service-booking', serviceBookingRoutes);


mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB successfully');
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
