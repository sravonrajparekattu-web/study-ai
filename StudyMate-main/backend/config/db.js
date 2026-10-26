import dns from 'dns';
import mongoose from 'mongoose';

// Configure DNS resolver to use Google Public DNS to prevent Windows SRV lookup timeouts
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (dnsErr) {
  console.warn('DNS server override notice:', dnsErr.message);
}

let isConnected = false;

/**
 * Connects to MongoDB Atlas database.
 */
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.log('📌 DEMO MODE: MONGODB_URI not configured. Using in-memory store.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    isConnected = true;
    console.log(`✅ MongoDB Atlas Connected Successfully! Host: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.error(`⚠️ MongoDB Atlas Connection Error: ${error.message}`);
    console.log('📌 DEMO MODE ACTIVE: Operating with in-memory store as fallback.');
  }
};

export const isMongoConnected = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

export default connectDB;
