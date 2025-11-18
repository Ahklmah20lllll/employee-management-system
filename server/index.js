import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import departmentRoutes from "./routes/departmentRoutes.js";
import employeeRoute from "./routes/employeeRoute.js";
import authRoutes from "./routes/auth.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import salaryRoutes from "./routes/salary.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();

// CORS configuration - allow frontend URL from environment variable
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Employee Management System API",
    version: "1.0.0",
    endpoints: {
      departments: "/api/departments",
      employees: "/api/employee",
      auth: "/api/auth",
      leaves: "/api/leave",
      salary: "/api/salary"
    }
  });
});

// API info route
app.get("/api", (req, res) => {
  res.json({
    message: "Employee Management System API",
    version: "1.0.0",
    endpoints: {
      departments: "/api/departments",
      employees: "/api/employee",
      auth: "/api/auth",
      leaves: "/api/leave",
      salary: "/api/salary"
    },
    methods: {
      departments: {
        "GET /api/departments": "List all departments",
        "POST /api/departments": "Create a department",
        "GET /api/departments/:id": "Get department by ID",
        "PUT /api/departments/:id": "Update department",
        "DELETE /api/departments/:id": "Delete department"
      },
      employees: {
        "GET /api/employee/list": "List all employees",
        "POST /api/employee/create": "Create an employee",
        "GET /api/employee/:id": "Get employee by ID",
        "PUT /api/employee/update/:id": "Update employee",
        "GET /api/employee/department/:id": "Get employees by department"
      },
      auth: {
        "POST /api/auth/login": "Login user"
      },
      leaves: {
        "POST /api/leave/add": "Add a leave request",
        "GET /api/leave/:id": "Get leaves by user ID"
      },
      salary: {
        "POST /api/salary/add": "Add salary record",
        "GET /api/salary/:id": "Get salary by employee ID"
      }
    }
  });
});

// Routes
app.use("/api/departments", departmentRoutes);
app.use("/api/employee", employeeRoute);
app.use("/api/auth", authRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/dashboard", dashboardRoutes);

// MongoDB connection with default fallback
const LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/ems";
const PORT = process.env.PORT || 5000;

// Start server with connection retry logic
const connectDB = async () => {
  try {
    // Try remote MongoDB if MONGO_URI is explicitly set
    if (process.env.MONGO_URI && process.env.MONGO_URI.trim() !== "" && !process.env.MONGO_URI.includes("127.0.0.1") && !process.env.MONGO_URI.includes("localhost")) {
      try {
        console.log("🔄 Attempting to connect to remote MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {
          serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        });
        console.log("✅ MongoDB Connected (Atlas/Remote)");
        return;
      } catch (atlasError) {
        console.warn("⚠️  Remote MongoDB connection failed, trying local...");
        console.warn(`   Error: ${atlasError.message}`);
        // Disconnect before trying local connection
        await mongoose.disconnect().catch(() => {});
      }
    } else {
      console.log("ℹ️  No remote MONGO_URI configured, using local MongoDB");
    }
    
    // Fallback to local MongoDB
    console.log("🔄 Connecting to local MongoDB...");
    await mongoose.connect(LOCAL_MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB Connected (Local)");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("   Please ensure MongoDB is running locally or check your MONGO_URI");
    console.warn("⚠️  Server starting without database connection");
    console.warn("   Some features may not work until MongoDB is available");
  }
};

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

connectDB();

const server = app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please stop the other process or use a different port.`);
    console.error(`   You can kill the process using: Get-NetTCPConnection -LocalPort ${PORT} | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }`);
  } else {
    console.error('❌ Server error:', err.message);
  }
  process.exit(1);
});
