const express = require('express');
const { registerUser, loginUser, sendOtp , verifyOtp} = require('../controllers/authController');
const router = express.Router();
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
module.exports = router;