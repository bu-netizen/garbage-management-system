const express = require("express");
const router = express.Router();
const Driver = require("../models/Drivers.model"); // update path as needed
const Complaint = require("../models/Complaint"); // update path as needed
const { default: mongoose } = require("mongoose");

// Add a driver
router.post("/add", async (req, res) => {
  try {
    const { name, phone, vehicle, licenseNumber } = req.body;

    if (!name || !phone || !vehicle || !licenseNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newDriver = new Driver({
      name,
      phone,
      vehicle,
      licenseNumber,
    });

    const savedDriver = await newDriver.save();

    res.status(201).json({
      message: "Driver added successfully!",
      driver: savedDriver,
    });
  } catch (error) {
    console.error("Error adding driver:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
router.get("/all", async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ message: "Internal server error." });
  }
})
router.post("/login", async (req, res) => {
  try {
    const { name, licenseNumber } = req.body;
    console.log("name")
    const driver = await Driver.findOne({ name, licenseNumber });
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res
      .cookie("userId", driver._id.toString(), {
        httpOnly: true,         // Prevent JS access
        sameSite: "lax",        // Can be 'strict' or 'none' (with secure)
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      }).status(201).json(driver);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
})

router.get("/status", async (req, res) => {
  const userId = req.cookies.userId;
  try {
    const complaints = await Complaint.aggregate([
      {
        $match: {
          driver: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: "$status",  // Group by the 'status' field
          count: { $sum: 1 } // Count the number of complaints for each status
        }
      }
    ]);

    // Transform the aggregation result into the desired format
    const statusCounts = complaints.reduce((acc, { _id, count }) => {
      acc[_id] = count; // Convert status to lowercase (approved -> approved, pending -> pending)
      return acc;
    }, {});

    console.log("Transformed result:", statusCounts);
    res.json(statusCounts); // Send the transformed result

  } catch (error) {
    console.error("Error fetching complaint status:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


module.exports = router;
