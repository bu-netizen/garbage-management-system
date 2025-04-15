const express = require("express");
const router = express.Router();
const Driver = require("../models/Drivers.model"); // update path as needed
const Complaint = require("../models/Complaint"); // update path as needed

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
    const drivers = await Driver.aggregate([
      
    ]);
    res.json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ message: "Internal server error." });
  }
})


router.get("/status", async (req, res) => {
  try {
    const complaints = await Complaint.aggregate([
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
