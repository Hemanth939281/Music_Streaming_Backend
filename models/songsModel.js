const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    movieName: {
        type: String,
        trim: true,
    },
    albumName: {
        type: String,
        trim: true,
        default: 'single',
    },
    genre: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: true,
    },
    songUrl: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'user',
        },
    ],
    releaseYear: {
        type: Number,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now,
    },
})

const songsModel = mongoose.model('songs', songSchema);

module.exports = songsModel;