const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');

// Load env vars first
dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5175', // Your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Test route
app.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Backend is working!' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Ensure PORT is read from env or default to 5000
const PORT = parseInt(process.env.PORT || '5000');
console.log('Attempting to start server on port:', PORT);

// Create server with better error handling
const startServer = async () => {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('Environment:', process.env.NODE_ENV || 'development');
      console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
      console.log('JWT Secret:', process.env.JWT_SECRET ? 'Set' : 'Not set');
      console.log('Email config:', process.env.EMAIL_USER ? 'Set' : 'Not set');
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try these solutions:`);
        console.error('1. Kill the process using the port');
        console.error('2. Change the PORT in .env file');
        console.error('3. Run the server on a different port using: PORT=5001 npm run dev');
        process.exit(1);
      } else {
        console.error('Server error:', error);
        process.exit(1);
      }
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 