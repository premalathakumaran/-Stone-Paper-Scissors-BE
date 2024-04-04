

// app.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://premalathakumaran18:aAJKvgLtdtSXSWBL@cluster0.tghao4a.mongodb.net/';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Game model
const Game = mongoose.model('Game', {
  player1: String,
  player2: String,
  rounds: [{ winner: String, score: String }]
});

app.use(bodyParser.json());

// Routes
app.post('/api/game', async (req, res) => {
  try {
    const { player1, player2, rounds } = req.body;
    const game = new Game({ player1, player2, rounds });
    await game.save();
    res.status(201).json({ message: 'Game saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
