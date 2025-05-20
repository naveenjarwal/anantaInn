const checkAvailability = (req, res) => {
 const { roomType, checkIn, checkOut } = req.body;
 // Mock logic (in real app, check DB or room calendar)
 const isAvailable = true; // Replace with actual availability check
 res.json({
   roomType,
   checkIn,
   checkOut,
   available: isAvailable
 });
};
module.exports = { checkAvailability };