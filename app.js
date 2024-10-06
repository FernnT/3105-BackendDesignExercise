const express = require('express');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use('/user', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {       
    console.log(`Server is running on port ${port}`);
    
});