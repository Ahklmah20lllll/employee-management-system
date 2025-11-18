import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }
});

export default mongoose.model("User", userSchema);
