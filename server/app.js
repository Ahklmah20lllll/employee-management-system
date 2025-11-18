import express from "express";
import mongoose from "mongoose";
import employeeRoute from "./routes/employeeRoute.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));

mongoose.connect("mongodb://localhost:27017/ems");

app.use("/api/employee", employeeRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
