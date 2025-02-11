// Ensure PORT is read from env or default to 5000
const PORT = parseInt(process.env.PORT || '5000');
console.log('Attempting to start server on port:', PORT);

// Create server with better error handling
const startServer = async () => {
  try {
    // Check if port is in use
    const net = require('net');
    const testServer = net.createServer();

    await new Promise((resolve, reject) => {
      testServer.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`Port ${PORT} is already in use`);
          reject(err);
        } else {
          reject(err);
        }
      });
      
      testServer.once('listening', () => {
        testServer.close();
        resolve();
      });
      
      testServer.listen(PORT);
    });

    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('Environment:', process.env.NODE_ENV || 'development');
      console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
      console.log('JWT Secret:', process.env.JWT_SECRET ? 'Set' : 'Not set');
      console.log('Email config:', process.env.EMAIL_USER ? 'Set' : 'Not set');
    });

    server.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
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