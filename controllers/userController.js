const { getUsers, addUser, findUserEmail} = require('../models/userModel');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const register = (req, res) => {
    const schema = Joi.object({
      username: Joi.string().min(3).required(),
      password: Joi.string().min(5).required(),
      email: Joi.string().email().required(),
    });
  
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    const { username, password, email } = req.body;
    const users = getUsers(); 
  
    const userExists = users.find((u) => u.username === username);
    if (userExists) return res.status(400).json({ message: 'User already exists' });
  
    const newUser = { id: users.length + 1, username, password, email };
    users.push(newUser);
    addUser(users); 
  
    res.status(201).json({ message: 'User registered successfully' });
  };

const login = (req,res) => {

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    const user = findUserEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.password !== password) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful',token });
}


const profile = (req,res) => {
  const  user  = req.user;
  res.status(200).json({ user });
  
}


module.exports = { register, login, profile };