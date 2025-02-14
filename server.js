require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Home Route with DB Status
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected';
  res.json({ message: 'Welcome to the API', database: dbStatus });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
