import mongoose from "mongoose";

// Get the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;
// Throw an error if MONGODB_URI is missing
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from environment variables");
}

// Function to connect to MongoDB
export async function connectDB() {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB Already Connected");
        return;
    }

    try {
        // Attempt to connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB Connected");
    }
    catch (error) {
        // Handle connection errors
        console.error("MongoDB Connection Error:", error);
        throw error; 
    }
}