const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bookingRoutes = require('./routes/bookingRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/bookings', bookingRoutes);
app.use('/api/check-availability', availabilityRoutes);
app.use('/api', authRoutes);
app.get('/', (req, res) => {
  res.send('Ananta Inn API Running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

