const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

// Add a complaint
router.post("/add", async (req, res) => {
  try {
    const { dumpType, estimatedSize, location, coordinates, nearestYard, complaint } = req.body;

    const newComplaint = new Complaint({
      dumpType,
      estimatedSize,
      location,
      coordinates,
      nearestYard,
      complaint,
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint added successfully", complaint: newComplaint });
  } catch (error) {
    console.error("Error saving complaint:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("driver");
    console.log(complaints)
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
)
router.put("/status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const updatedComplaint = await Complaint.findById(id);
    if (!updatedComplaint) {
      res.status(404).json({ message: "Complaint not found" });
      return;
    }

    updatedComplaint.status = req.body.status;
    updatedComplaint.driver = req.body.driver;
    await updatedComplaint.save();
    res.status(200).json({ message: "Complaint updated successfully" });
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
