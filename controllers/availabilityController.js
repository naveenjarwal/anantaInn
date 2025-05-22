const checkAvailability = (req, res) => {
 const { checkIn, checkOut, guests, rooms, roomType, extraMattresses, totalPrice } = req.body;
 // Mock logic (in real app, check DB or room calendar)
 const isAvailable = true; // Replace with actual availability check
 res.json({
   checkIn, checkOut, guests, rooms, roomType, extraMattresses, totalPrice,
   available: isAvailable
 });
};
module.exports = { checkAvailability };