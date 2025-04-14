const express = require("express");
const router = express.Router();
const Driver = require("../models/Drivers.model"); // update path as needed

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
module.exports = router;
