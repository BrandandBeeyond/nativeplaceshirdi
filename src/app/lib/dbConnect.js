import mongoose from "mongoose";

let cached = globalThis.__nativeplaceMongoose;

if (!cached) {
  cached = globalThis.__nativeplaceMongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URL;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
