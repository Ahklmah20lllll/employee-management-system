import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  basicSalary: {
    type: Number,
    required: true
  },
  allowances: {
    type: Number,
    default: 0
  },
  deductions: {
    type: Number,
    default: 0
  },
  netSalary: {
    type: Number,
    required: true
  },
  payDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Salary", salarySchema);
