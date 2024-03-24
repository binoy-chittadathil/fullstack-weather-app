const express = require('express');
const { addLocation, getMyLocation, deleteCartItem } = require('../controllers/myLocationControllers');
const router = express.Router();

// add to my location
router.post('/', addLocation);

// get my location data
router.get('/', getMyLocation);

// delete my location data
router.delete('/:place', deleteCartItem)


module.exports = router