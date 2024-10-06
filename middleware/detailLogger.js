const loggingMiddleware = (req, res, next) => {
    const method = req.method;
    const route = req.originalUrl;
    const timestamp = new Date().toISOString(); 
  
    console.log(`[${timestamp}] ${method} request to ${route}`);
  
    next();
  };
  
  module.exports = { loggingMiddleware };