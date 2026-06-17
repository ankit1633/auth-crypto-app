const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', {
      headers: { 'Accept': 'application/json' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error in GET /api/coins:', error.message);
    res.status(500).json({ message: 'Error fetching coin data from CoinGecko' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {
      headers: { 'Accept': 'application/json' }
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error in GET /api/coins/${req.params.id}:`, error.message);
    res.status(500).json({ message: 'Error fetching coin details from CoinGecko' });
  }
});

router.get('/:id/chart', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`, {
      headers: { 'Accept': 'application/json' }
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error in GET /api/coins/${req.params.id}/chart:`, error.message);
    res.status(500).json({ message: 'Error fetching coin chart data from CoinGecko' });
  }
});

module.exports = router;

