const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        vehicle: { type: String, required: true },
        licenseNumber: { type: String, required: true, unique: [true, "License number already exists"] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("drivers", driverSchema);
