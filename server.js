// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const bookingRoutes = require('./routes/bookingRoutes');
// const app = express();
// const PORT = process.env.PORT || 5000;
// app.use(cors());
// app.use(express.json()); // to parse JSON
// app.use('/api/bookings', bookingRoutes);
// app.get('/', (req, res) => {
//  res.send('Welcome to Ananta Inn API');
// });
// app.listen(PORT, () => {
//  console.log(`Server running on port ${PORT}`);
// });


// // server.js (Express example)
// const express = require('express');
// const app = express();
// app.use(express.json());

// let bookings = []; // In-memory, use DB in production

// app.post('/api/check-availability', (req, res) => {
//   // TODO: Check DB for room availability
//   // For demo, always available
//   res.json({ available: true });
// });

// app.post('/api/bookings', (req, res) => {
//   // TODO: Save booking to DB
//   bookings.push(req.body);
//   res.status(201).json({ success: true });
// });

// app.listen(5000, () => console.log('API running on port 5000'));



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
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Ananta Inn API Running...');
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

