const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the College Listing Schema
const listingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String, // This will store the URL/path of the image
        default: "https://via.placeholder.com/400x300", // Default image if none is provided
    },
    description: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    establishedYear: {
        type: Number,
    },
    courses: {
        type: [String], // Array of course names
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;