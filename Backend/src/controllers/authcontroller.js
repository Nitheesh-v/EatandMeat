import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Cookie options for cross-origin production
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

// Register User
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, phone, role } = req.body;

    if (!fullName || !email || !password || !role || !phone) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ fullName, email, password, role, phone });

    const token = generateToken(user._id, user.role);
    res.cookie("token", token, getCookieOptions());

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role, phone: user.phone },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: "Please enter email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (user.role !== role) {
      return res.status(403).json({ success: false, message: `This account is registered as ${user.role}` });
    }

    const token = generateToken(user._id, user.role);
    res.cookie("token", token, getCookieOptions());

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role, phone: user.phone },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Logout
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
