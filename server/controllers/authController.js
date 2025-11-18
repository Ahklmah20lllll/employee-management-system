import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/user.js";
import Employee from "../model/Employee.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Get employee info if exists
    let employee = null;
    if (user.employeeId) {
      employee = await Employee.findById(user.employeeId);
    }

    const JWT_SECRET = process.env.JWT_SECRET_KEY || "your-secret-key-change-in-production";
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "10d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        employeeId: user.employeeId,
        employee: employee
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
