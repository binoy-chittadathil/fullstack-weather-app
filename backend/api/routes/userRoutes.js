const express = require('express');
const { userSignUp, userLogin, userAuthentication, userLogout } = require('../controllers/userControllers');
const router = express.Router();

// user registration
router.post('/signup', userSignUp);

// user login
router.post('/login', userLogin);

// user authentication
router.get('/profile', userAuthentication);

// user logout
router.post('/logout', userLogout);


module.exports = router