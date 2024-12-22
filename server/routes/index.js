const express = require('express');
const router = express.Router();

// Import route modules
const eventsRoutes = require('./events');
const attendeesRoutes = require('./attendees');
const tasksRoutes = require('./tasks');
const authRoutes = require('./auth');

// Use routes
router.use('/auth', authRoutes);
router.use('/events', eventsRoutes);
router.use('/attendees', attendeesRoutes);
router.use('/tasks', tasksRoutes);

module.exports = router;
