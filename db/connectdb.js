const mongoose = require('mongoose');

// connecting to mongodb

const connectDb = async () => {
    const url = process.env.MONGODB_URL || ''

    try {
        await mongoose.connect(url);
        console.log("connected to mongodb successfully")
    } catch (error) {
        console.error("Failed to connect to mongodb", error)
    }
}

module.exports = connectDb;