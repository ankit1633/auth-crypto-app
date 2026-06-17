const app = require('../app');
const mongoose = require('mongoose');
require('dotenv').config();

// Vercel serverless environment keeps instances alive across requests.
// We should check if we're already connected to MongoDB before connecting again.
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
}

// Export the Express app for Vercel
module.exports = app;
