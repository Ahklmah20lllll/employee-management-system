import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    depName: { type: String, required: true },
    depHead: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Department", departmentSchema);
