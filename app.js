const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../model/listing");

// Connect to database
const mongo = "mongodb://127.0.0.1:27017/collegecore";

async function main() {
    try {
        await mongoose.connect(mongo);
        console.log("Connected to database");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

const intiDB = async () => {
    try {
        await Listing.deleteMany({}); // Delete previous data
        await Listing.insertMany(initdata.data); // Insert sample data
        console.log("Data was initialized");
    } catch (err) {
        console.error("Error initializing database:", err);
    }
};

// Run the functions
main().then(() => {
    intiDB();
});
