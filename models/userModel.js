const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  likedSongs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Song",
  },
  playlists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Playlist",
  },
  uploadedSongs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Song",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
