const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const SALT_LENGTH = 12;

// router.post('/signup', async (req, res) => {
//     try {
//         // Check if the username is already taken
//         const userInDatabase = await User.findOne({ username: req.body.username });
//         if (userInDatabase) {
//             return res.json({error: 'Username already taken.'});
//         }
//         // Create a new user with hashed password
//         const user = await User.create({
//             username: req.body.username,
//             email: req.body.email,
//             hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH)
//         })
//         const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
//         res.status(201).json({ user, token });
//         console.log('this is the token below ----')
//         console.log(token)
//         console.log('token end  ----')
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required: username, email, password' });
    }
    try {
        console.log('Request body:', req.body);
        const userInDatabase = await User.findOne({ username });
        if (userInDatabase) {
            return res.json({error: 'Username already taken.'});
        }
        const hashedPassword = bcrypt.hashSync(password, SALT_LENGTH);
        const user = await User.create({ username, email, hashedPassword });
        const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
            const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid username or password.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;