const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || 'birdiesecret';

// ✅ Signup route
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, SECRET_KEY);
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Signup failed' });
    }
});

/// ✅ Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, SECRET_KEY);
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login failed' });
    }
});

// ✅ Profile route 
router.get('/profile', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        const user = await User.findById(decoded.id);
        res.json({ email: user.email, _id: user._id, theme: user.theme, notifications: user.notifications });
    });
});

// ✅ Preferences route 
router.put('/preferences', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });

        const { theme, notifications } = req.body;
        const user = await User.findByIdAndUpdate(
            decoded.id,
            { theme, notifications },
            { new: true }
        );
        res.json({ email: user.email, theme: user.theme, notifications: user.notifications });
    });
});

// ✅ Change password route
router.put('/change-password', async (req, res) => {
    const token = req.headers.authorization;
    const { newPassword } = req.body;

    if (!token) return res.status(403).json({ error: 'No token provided' });
    if (!newPassword) return res.status(400).json({ error: 'New password required' });

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

        res.json({ success: true, message: 'Password updated' });
    });
});

module.exports = router;
