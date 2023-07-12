const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');
const dotenv = require('dotenv').config();

// General container
const authHelpers = {};


// @desc    Geneate token
authHelpers.generateToken = asyncHandler(({id}) => {
    if (typeof(id) !== 'object'){
        res.status(400);
        throw new Error('Object (id) is required to generate token');
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
});

// @desc    Authenticate token
authHelpers.authenticateToken = asyncHandler(async (req, res, next) => {
        // Get the jwt access token from the request header
        const token = req.headers['authorization'].split('Bearer ')[1];

        if (!token) {
            res.status(401);
            throw new Error('Unauthorized');
        };

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        // If token is invalid
        if (!decodedToken) {
            res.status(401);
            throw new Error('Unauthorized user, token invalid');
        }

        // If token is valid
        const user = await User.findById(decodedToken.id).select('-password');

        // If user not found
        if (!user) {
            res.status(404);
            throw new Error('User not found, please register');
        }

        

        // If user found, set req.user to user
        req.user = user;

        next();
});

// Export container
module.exports = authHelpers;