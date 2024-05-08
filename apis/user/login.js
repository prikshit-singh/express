const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/userSchema/adminSchema')
const app = express();

const login = app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if username and password are provided
    if (!email || !password) {
        return res.status(200).json({CODE:400, message: 'email and password are required' });
    }

    // Find user by email (replace with your actual user database query)
    const user =await User.findOne({email});

    // Check if user exists
    if (!user) {
        return res.status(200).json({CODE:401, message: 'Invalid email or password' });
    }
    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(200).json({CODE:401, message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, 'secretkeygitgurus', { expiresIn: '1d' }); // Replace 'secret' with your own secret key

    // Return token
    res.status(200).json({CODE:200, token,user });
});



module.exports = login