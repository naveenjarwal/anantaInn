const express = require('express');
const router = express.Router();
const { checkAvailability } = require('../controllers/availabilityController');
router.post('/checkAvailability', checkAvailability);
module.exports = router;