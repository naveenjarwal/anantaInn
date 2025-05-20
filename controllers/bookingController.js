const createBooking = (req, res) => {
 const { name, roomType, checkIn, checkOut } = req.body;
 // Logic to save booking (to DB or in-memory)
 console.log('Booking Request:', req.body);
 res.status(201).json({
   message: 'Booking confirmed',
   booking: { name, roomType, checkIn, checkOut }
 });
};
module.exports = { createBooking };