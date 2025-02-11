require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');

const testAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin user exists
    const adminUser = await User.findOne({ email: '227r1a66d6@cmrtc.ac.in' });
    console.log('Admin user:', {
      name: adminUser?.name,
      email: adminUser?.email,
      role: adminUser?.role
    });

    // Disconnect from MongoDB
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
};

testAdmin(); 