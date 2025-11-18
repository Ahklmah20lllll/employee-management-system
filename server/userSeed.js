import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./model/user.js";
import Employee from "./model/Employee.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ems";
const LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/ems";

async function seedUsers() {
  try {
    // Connect to MongoDB - try local first
    let connected = false;
    if (process.env.MONGO_URI && process.env.MONGO_URI !== LOCAL_MONGO_URI) {
      try {
        await mongoose.connect(process.env.MONGO_URI);
        connected = true;
      } catch (err) {
        console.log("⚠️  Remote MongoDB failed, trying local...");
      }
    }
    if (!connected) {
      await mongoose.connect(LOCAL_MONGO_URI);
    }
    console.log("✅ Connected to MongoDB");

    // Check if users already exist
    const existingUser = await User.findOne({ email: "admin@example.com" });
    if (existingUser) {
      console.log("⚠️  Test user already exists. Skipping seed.");
      await mongoose.disconnect();
      return;
    }

    // Create a test employee
    const testEmployee = new Employee({
      fname: "Admin",
      lname: "User",
      email: "admin@example.com",
      contact: "1234567890",
      designation: "Administrator",
      department: "IT",
      address: "123 Main St"
    });

    const savedEmployee = await testEmployee.save();
    console.log("✅ Test employee created:", savedEmployee._id);

    // Create a test user with hashed password
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const testUser = new User({
      email: "admin@example.com",
      password: hashedPassword,
      employeeId: savedEmployee._id
    });

    await testUser.save();
    console.log("✅ Test user created successfully!");
    console.log("\n📧 Login Credentials:");
    console.log("   Email: admin@example.com");
    console.log("   Password: admin123");
    console.log("\n");

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedUsers();

