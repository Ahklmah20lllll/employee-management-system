import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    contact: String,
    designation: String,
    department: String,
    address: String,
    profileImage: String
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
