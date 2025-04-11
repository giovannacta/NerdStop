import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// (Signup)
router.post("/", async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      isAdmin,
      phone,
      street,
      apartment,
      city,
      state,
      zip,
      country,
    } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      isAdmin: isAdmin || false,
      phone,
      street,
      apartment,
      city,
      state,
      zip,
      country,
      created_at: new Date(),
    });

    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const secret = process.env.SECRET || "default_secret";

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      secret,
      { expiresIn: "2d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email, isAdmin: user.isAdmin },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

export default router;
