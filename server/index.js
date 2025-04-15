const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const twilio = require("twilio");
const jwt = require('jsonwebtoken');



const app = express();
app.use(express.json());
app.use(cors());

//ROUTES
const complaintRoutes = require("./routes/complaints");
const driverRoutes = require("./routes/drivers");




//mongodb connection
mongoose
    .connect("mongodb://localhost:27017/grbms")
    .then(() => console.log('Mongodb connected'))
    .catch((err) => console.log('Error :', err));

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

// Send OTP
app.post("/send-otp", async (req, res) => {
    const { phone } = req.body;
    try {
        const verification = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({ to: phone, channel: "sms" });
        res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post("/verify-otp", async (req, res) => {
    const { phone, code } = req.body;
    try {
        const verificationCheck = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
            .verificationChecks.create({ to: phone, code });

        if (verificationCheck.status === "approved") {
            const token = jwt.sign({ phone }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, message: "OTP verified successfully", token });
        } else {
            res.status(400).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.use("/api/drivers", driverRoutes);
app.use("/api/complaints", complaintRoutes);

// Start Server
app.listen(5001, () => console.log("🚀 Server running on port 5001"));