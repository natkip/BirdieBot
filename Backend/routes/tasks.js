const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || 'birdiesecret';

  
// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Public test route for frontend dev (no auth needed)
router.get('/test', (req, res) => {
    res.json([
        { id: 1, title: 'First Task' },
        { id: 2, title: 'Second Task' },
        { id: 3, title: 'Third Task' },
    ]);
});

// Secure routes below
router.use(authMiddleware);

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Create a task
router.post('/', async (req, res) => {
    try {
        const task = await Task.create({ ...req.body, userId: req.user.id });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid task ID format' });
    }
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (err) {
        console.error('Update error:', err.message);
        res.status(500).json({ error: 'Failed to update task' });
    }
});


// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

module.exports = router;
