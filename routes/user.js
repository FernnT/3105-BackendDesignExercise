const { register, profile, login} = require('../controllers/userController');
const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const {rateLimiter} = require('../middleware/rateLimiter');
const router = express.Router();

router.get('/profile', rateLimiter, authMiddleware,profile);
router.post('/login',login);
router.post('/register',register);

// router.get('/allUsers',getAllUsers);

module.exports = router;