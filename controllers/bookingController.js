const createBooking = (req, res) => {
 const { checkIn, checkOut, guests, rooms, roomType, extraMattresses, totalPrice } = req.body;
 // Logic to save booking (to DB or in-memory)
 console.log('Booking Request:', req.body);
 res.status(201).json({
   message: 'Booking confirmed',
   booking: { checkIn, checkOut, guests, rooms, roomType, extraMattresses, totalPrice }
 });
};
module.exports = { createBooking };