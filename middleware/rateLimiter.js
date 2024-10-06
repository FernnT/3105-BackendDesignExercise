const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 5, 
    message: 'Too many requeststry again after 30 seconds.',
  });

module.exports = { rateLimiter };