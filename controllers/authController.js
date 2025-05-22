// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../modals/User');

// const registerUser = async (req, res) => {
//  const { name, email, mobile, password } = req.body;
//  try {
//    const existingUser = await User.findOne({ email });
//    if (existingUser) return res.status(400).json({ message: 'User already exists' });
// //    const hashedPassword = await bcrypt.hash(password, 10);
//    const user = new User({ name, email, mobile, password });
//    await user.save();
//    res.status(201).json({ message: 'User registered successfully' });
//  } catch (err) {
//    console.error(err);
//    res.status(500).json({ message: 'Server error' });
//  }
// };
// const loginUser = async (req, res) => {
//  const { email, password } = req.body;
//  try {
//    const user = await User.findOne({ email });
//    if (!user) return res.status(400).json({ message: 'User not found' });
//    const isMatch = await bcrypt.compare(password, user.password);
//    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
//    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1d' });
//    res.json({ message: 'Login successful', token });
//  } catch (err) {
//    console.error(err);
//    res.status(500).json({ message: 'Server error' });
//  }
// };
// module.exports = { registerUser, loginUser };




const express = require('express');
// const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// const otpMap = new Map();
// app.post('/api/send-otp', async (req, res) => {
//  const { email } = req.body;
//  const otp = Math.floor(100000 + Math.random() * 900000).toString();
//  otpMap.set(email, otp);
//  const transporter = nodemailer.createTransport({
//    service: 'gmail',
//    auth: {
//      user: 'your@gmail.com',
//      pass: 'your-app-password',
//    },
//  });
//  await transporter.sendMail({
//    from: 'your@gmail.com',
//    to: email,
//    subject: 'Your OTP for Login',
//    text: `Your OTP is ${otp}`,
//  });
//  res.json({ message: 'OTP sent' });
// });
// app.post('/api/verify-otp', (req, res) => {
//  const { email, otp } = req.body;
//  if (otpMap.get(email) === otp) {
//    otpMap.delete(email);
//    res.json({ success: true });
//  } else {
//    res.status(400).json({ message: 'Invalid OTP' });
//  }
// });
// app.listen(5000, () => console.log('Server running on port 5000'));



const nodemailer = require('nodemailer');

const otpMap = new Map();

const sendOtp = async (req, res) => {

  try {

    const { email } = req.body;

    if (!email) {

      return res.status(400).json({ message: 'Email is required' });

    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpMap.set(email, otp);

    let transporter = nodemailer.createTransport({

      service: 'gmail',

      auth: {

        user: 'anantainn5@gmail.com',

        pass: 'zxlx zhfb tfzx nzsw',

      },

    });

    await transporter.sendMail({

      from: 'anantainn5@gmail.com',

      to: email,

      subject: 'Your OTP for Login',

      text: `Your OTP is ${otp}`,

    });

    res.json({ message: 'OTP sent' });

  } catch (err) {

    console.error(err);

    res.status(500).json({ message: 'Failed to send OTP' });

  }

};

// VERIFY OTP
const verifyOtp = (req, res) => {
 const { email, otp } = req.body;
 const storedOtp = otpMap.get(email);
 if (!storedOtp) {
   return res.status(400).json({ success: false, message: 'No OTP found for this email' });
 }
 if (storedOtp === otp) {
   otpMap.delete(email); // Clear OTP after success
   return res.json({ success: true, message: 'OTP verified successfully' });
 } else {
   return res.status(400).json({ success: false, message: 'Invalid OTP' });
 }
};
module.exports = { sendOtp, verifyOtp };
 