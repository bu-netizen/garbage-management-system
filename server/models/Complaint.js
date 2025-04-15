
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  dumpType: String,
  estimatedSize: String,
  location: String,
  nearestYard: String,
  complaint: String,
  status:{
    type: String,
    default: "Pending",
    enum: ["Pending", "Approved","Rejected"]
  },
  driver:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "drivers",
    default:null
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default:null
  },

},{timestamps: true});

module.exports = mongoose.model("complaint", complaintSchema);
