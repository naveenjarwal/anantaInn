const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
//  name: { type: String, required: true },
//  email: { type: String, required: true, unique: true },
//  mobile: { type: Number, required: true, unique: true },
//  password: { type: String, required: true },
 checkIn:{ type: String, required: true }, 
 checkOut:{ type: String, required: true },
  guests:{ type: String, required: true }, 
  rooms:{ type: String, required: true }, 
  roomType:{ type: String, required: true }, 
  extraMattresses:{ type: String, required: true }, 
  totalPrice:{ type: String, required: true }
}, {
 timestamps: true
});
module.exports = mongoose.model('User', userSchema);