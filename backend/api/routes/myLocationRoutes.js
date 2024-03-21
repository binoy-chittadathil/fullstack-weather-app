const express = require('express');
const { addLocation, getMyLocation } = require('../controllers/myLocationControllers');
const router = express.Router();

// add to my location
router.post('/', addLocation);

// get my location data
router.get('/', getMyLocation);


module.exports = router