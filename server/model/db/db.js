import mongoose from "mongoose";

export default async function connectDB(uri = "mongodb://127.0.0.1:27017/ems") {
  try {
    await mongoose.connect(uri, { dbName: "ems" });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connect error:", err.message);
    process.exit(1);
  }
}
