const jwt = require('jsonwebtoken');
const {loggingMiddleware} = require('./detailLogger');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader  = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided' });
      }
 
    const token = authHeader.split(' ')[1];

    if (!token) {return res.status(403).json({ message: "Unauthorized access" })};
   
        jwt.verify(token, process.env.JWT_SECRET, (error,decoded) => {
      if (error) {
        return res.status(403).json({ message: "Unauthorized access" });
      }  
     
      req.user = decoded;
      loggingMiddleware(req, res, next);
      next();
    });
 

}

module.exports = { authMiddleware };