// const Booking = require('../modals/Booking')
// const createBooking = (req, res) => {
 

//  try{
//     const { checkIn, checkOut, guests, rooms, roomType, extraMattresses, totalPrice } = req.body;
//     co
//  }
//  // Logic to save booking (to DB or in-memory)
//  console.log('Booking Request:', req.body);
//  res.status(201).json({
//    message: 'Booking confirmed...',
//    booking: { checkIn, checkOut, guests, rooms, roomType, extraMattresses, totalPrice }
//  });
// };
// module.exports = { createBooking };



const Booking = require('../modals/Booking'); // add this at the top
const createBooking = async (req, res) => {
 try {
   const {name,email,mobile, checkIn, checkOut, guests, rooms, roomType, extraMattresses, totalPrice } = req.body;
   const newBooking = new Booking({
    name,
    email,
    mobile,
     checkIn,
     checkOut,
     guests,
     rooms,
     roomType,
     extraMattresses,
     totalPrice
   });
   await newBooking.save(); // save to MongoDB
   console.log('Booking saved:', newBooking);
   res.status(201).json({
     message: 'Booking confirmed...',
     booking: newBooking
   });
 } catch (err) {
   console.error('Booking save error:', err);
   res.status(500).json({ error: 'Failed to save booking' });
 }
};


const getAllBookings = async (req, res) => {
 try {
   const bookings = await Booking.find().sort({ createdAt: -1 }); // latest first
   res.status(200).json({ bookings });
 } catch (err) {
   console.error('Error fetching bookings:', err);
   res.status(500).json({ error: 'Failed to fetch bookings' });
 }
};



module.exports = { createBooking, getAllBookings };