const express = require('express');
const cors = require('cors');

const coinsRoutes = require('./routes/coins');
const weatherRoutes = require('./routes/weather');
const profileRoutes = require('./routes/profile');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/coins', coinsRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
