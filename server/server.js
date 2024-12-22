const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/event-management')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Import routes directly
const eventsRoutes = require('./routes/events');
const attendeesRoutes = require('./routes/attendees');
const tasksRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

// Mount routes directly
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/attendees', attendeesRoutes);
app.use('/api/tasks', tasksRoutes);

// 404 handler - must be before error handler
app.use((req, res, next) => {
  console.log(`404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ 
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Available routes:');
  console.log('- POST   /api/auth/register');
  console.log('- POST   /api/auth/login');
  console.log('- GET    /api/events');
  console.log('- POST   /api/events');
  console.log('- PUT    /api/events/:id');
  console.log('- DELETE /api/events/:id');
  console.log('- GET    /api/attendees');
  console.log('- POST   /api/attendees');
  console.log('- PUT    /api/attendees/:id');
  console.log('- DELETE /api/attendees/:id');
});
