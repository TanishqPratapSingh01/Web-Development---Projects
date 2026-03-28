const { validationResult } = require('express-validator');

// Centralized validation error handler (learning: middleware for consistent error responses)
const validationErrorHandler = (err, req, res, next) => {
  // Handle express-validator errors first
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }

  // Handle other errors (e.g., custom or server errors)
  if (err) {
    console.error('Middleware error:', err);
    return res.status(err.status || 500).json({
      success: false,
      error: err.message || 'Internal server error'
    });
  }

  next();
};

module.exports = { validationErrorHandler };

