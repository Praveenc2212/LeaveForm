import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

// --- Configuration ---
// Primary database (e.g., Atlas). Replace with your actual connection string.
const PRIMARY_DB_URL = process.env.MONGO_DB_ATLAS_URL;

// Fallback database (local instance)
const FALLBACK_DB_URL = process.env.MONGO_DB_COMPASS_URL;

console.log(`Primary DB URL: ${PRIMARY_DB_URL}`);
console.log(`Fallback DB URL: ${FALLBACK_DB_URL}`);

// --- Connection Logic ---
const connectWithFallBack = () => {
  // Set connection options
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // This helps prevent the server from hanging on an initial failed connection attempt
    serverSelectionTimeoutMS: 5000, 
  };

  console.log("Attempting to connect to the primary database (Atlas)...");
  mongoose.connect(PRIMARY_DB_URL, options)
    .catch((primaryError) => {
      console.warn(`Could not connect to primary database: ${primaryError.name}`);
      console.log("Attempting to connect to the fallback database (local)...");

      // If primary fails, try connecting to the fallback
      mongoose.connect(FALLBACK_DB_URL, options)
        .catch((fallbackError) => {
          console.error(`FATAL: Could not connect to any database: ${fallbackError.name}`);
          // If both fail, we will rely on the 'disconnected' event handler below to retry.
        });
    });
};

const DB = {
  connect: () => {
    // Start the initial connection attempt
    connectWithFallBack();

    // --- Event Handlers for Mongoose Connection ---

    // When successfully connected
    mongoose.connection.on('connected', () => {
      console.log(`Database connected successfully to: ${mongoose.connection.host}`);
    });

    // If an error occurs after the initial connection was established
    mongoose.connection.on('error', (err) => {
      console.error(`Database connection error: ${err}`);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      console.log("Database disconnected. Attempting to reconnect in 5 seconds...");
      // Mongoose's underlying driver will try to reconnect automatically.
      // If you want to force it, you can add a retry mechanism here, but it's often better
      // to rely on the driver's built-in behavior. This log is for awareness.
      setTimeout(() => connectWithFallBack(), 5000); // Retry connection
    });

    // When the process is terminated, close the connection
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Database connection closed due to application termination.');
        process.exit(0);
      });
    });
  }
};

export default DB;