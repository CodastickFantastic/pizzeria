import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

export default async function ConnectDB() {
  let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  try {
    if (cached.promise == null) {
      const opts = {
        bufferCommands: true,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }

    cached.conn = await cached.promise;

    if (cached) {
      return cached.conn;
    }
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
