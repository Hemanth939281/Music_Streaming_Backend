const Song = require('../models/songsModel');

const songCtrl = {
    // Get all songs
    getAllSongs: async (req, res) => {
        try {
            const songs = await Song.find();
            res.status(200).json(songs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Get a single song by ID
        getSongById: async (req, res) => {
        try {
            const song = await Song.findById(req.params.id);
            if (!song) {
                return res.status(404).json({ message: 'Song not found' });
            }
            res.status(200).json(song);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Create a new song
        createSong: async (req, res) => {
        const song = new Song(req.body);
        try {
            const newSong = await song.save();
            res.status(201).json(newSong);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    // Update a song by ID
        updateSong: async (req, res) => {
        try {
            const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updatedSong) {
                return res.status(404).json({ message: 'Song not found' });
            }
            res.status(200).json(updatedSong);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    // Delete a song by ID
        deleteSong: async (req, res) => {
        try {
            const deletedSong = await Song.findByIdAndDelete(req.params.id);
            if (!deletedSong) {
                return res.status(404).json({ message: 'Song not found' });
            }
            res.status(200).json({ message: 'Song deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}

module.exports = songCtrl;