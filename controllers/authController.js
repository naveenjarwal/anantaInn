// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// // Replace this with real DB in production
// let users = [];
// const registerUser = async (req, res) => {
//  const { name, email, password } = req.body;
//  const userExists = users.find(user => user.email === email);
//  if (userExists) return res.status(400).json({ message: 'User already exists' });
//  const hashedPassword = await bcrypt.hash(password, 10);
//  const newUser = { id: Date.now(), name, email, password: hashedPassword };
//  users.push(newUser);
//  res.status(201).json({ message: 'User registered successfully' });
// };
// const loginUser = async (req, res) => {
//  const { email, password } = req.body;
//  const user = users.find(user => user.email === email);
//  if (!user) return res.status(400).json({ message: 'User not found' });
//  const isMatch = await bcrypt.compare(password, user.password);
//  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
//  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1d' });
//  res.json({ message: 'Login successful', token });
// };
// module.exports = { registerUser, loginUser };



const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modals/User');

const registerUser = async (req, res) => {
 const { name, email, mobile, password } = req.body;
 try {
   const existingUser = await User.findOne({ email });
   if (existingUser) return res.status(400).json({ message: 'User already exists' });
//    const hashedPassword = await bcrypt.hash(password, 10);
   const user = new User({ name, email, mobile, password });
   await user.save();
   res.status(201).json({ message: 'User registered successfully' });
 } catch (err) {
   console.error(err);
   res.status(500).json({ message: 'Server error' });
 }
};
const loginUser = async (req, res) => {
 const { email, password } = req.body;
 try {
   const user = await User.findOne({ email });
   if (!user) return res.status(400).json({ message: 'User not found' });
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1d' });
   res.json({ message: 'Login successful', token });
 } catch (err) {
   console.error(err);
   res.status(500).json({ message: 'Server error' });
 }
};
module.exports = { registerUser, loginUser };