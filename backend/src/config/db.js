import mongoose from "mongoose";

let connectionPromise;

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    console.log("Connecting to MongoDB");
    connectionPromise = mongoose
      .connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
      })
      .then((connection) => {
        console.log("MongoDB connected");
        return connection;
      })
      .catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
  }

  return connectionPromise;
};

export default connectDB;
