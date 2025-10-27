const mongoose = require('mongoose');

const connectDB = async (DBUri) => {

    try {
        await mongoose.connect(DBUri);
        console.log("Connected to MongoDB")

    } catch (e) {
        console.error(`Failed to connect to the DB : ${e.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;