const express = require('express');
const cors = require('cors');
const path = require('path');
const tasksRouter = require('./routes/tasks');
const { validationErrorHandler } = require('./middleware/validation');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Learning Backend API is running!' });
});

// Routes
app.use('/api/tasks', tasksRouter);

// Global error handler (learning: centralized error management)
app.use(validationErrorHandler);

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Learning Backend API server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Tasks API: http://localhost:${PORT}/api/tasks`);
});

module.exports = app;