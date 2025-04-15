const UserModel = require("../models/user.model");
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new UserModel({ name, email, password });
        await user.save();
        res
            .cookie("userId", user._id.toString(), {
                httpOnly: true,         // Prevent JS access
                sameSite: "lax",        // Can be 'strict' or 'none' (with secure)
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            }).status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server Error" });
    }
    
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password); // ← await is required
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ Set cookie with user ID
        res
            .cookie("userId", user._id.toString(), {
                httpOnly: true,         // Prevent JS access
                sameSite: "lax",        // Can be 'strict' or 'none' (with secure)
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })
            .status(200)
            .json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
