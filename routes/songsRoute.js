const express = require('express');
const songCtrl = require('../controllers/songController');

const router = express.Router();

// Get all songs
router.get('/', songCtrl.getAllSongs);

// Get a single song by ID
router.get('/:id', songCtrl.getSongById);

// Create a new song
router.post('/', songCtrl.createSong);

// Update a song by ID
router.put('/:id', songCtrl.updateSong);

// Delete a song by ID
router.delete('/:id', songCtrl.deleteSong);

module.exports = router;