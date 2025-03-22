import mongoose from "mongoose";

// Get the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/tryst";

// Throw an error if MONGODB_URI is missing
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from environment variables");
}

let db : mongoose.Mongoose;

// Function to connect to MongoDB
export async function connectDB() {
    // Check if already connected
    if (db !=undefined) {
        console.log("MongoDB Already Connected");
        return db;
    }

    try {
        // Attempt to connect to MongoDB
        db =  await mongoose.connect(MONGODB_URI);
        console.log("MongoDB Connected");
    }
    catch (error) {
        // Handle connection errors
        console.error("MongoDB Connection Error:", error);
        throw error; 
    }
}
