import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaPlusCircle,    // For Create Bin
  FaUserTie,       // For Manage Driver
  FaRoute,         // For Assign Best Route
  FaChartLine,     // For View Garbage Report
  FaComments       // For View Complaints
} from "react-icons/fa";
import "./AdminDashboard.css"; // CSS file for styling

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container max-h-dvh overflow-hidden">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <h3 className="dashboard-subtitle">Manage and monitor garbage collection</h3>

      <div className="flex flex-wrap grow shrink gap-5 justify-center">
        {/* Manage Bin */}
        <motion.div className="grid-item create-bin basis-72"
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <FaPlusCircle className="grid-icon" />
          <button className="dashboard-button" onClick={() => navigate("/ManageBin")}>Create Bin</button>
        </motion.div>

        

        {/* Manage Driver */}
        <motion.div className="grid-item ManageDrive basis-72"
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <FaUserTie className="grid-icon" />
          <button className="dashboard-button" onClick={() => navigate("/ManageDriver")}>Manage Driver</button>
        </motion.div>

        {/* Assign Best Route */}
        <motion.div className="grid-item basis-72 assign-route"
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <FaRoute className="grid-icon" />
          <button className="dashboard-button" onClick={() => navigate("/Assignroute")}>Assign Best Route</button>
        </motion.div>

        {/* View Garbage Report */}
        <motion.div className="grid-item basis-72 garbage-report"
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <FaChartLine className="grid-icon" />
          <button className="dashboard-button" onClick={() => navigate("/VGR")}>View Garbage Report</button>
        </motion.div>

        {/* View Complaints */}
        <motion.div className="grid-item basis-72 complaints"
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <FaComments className="grid-icon" />
          <button className="dashboard-button" onClick={() => navigate("/view-cmplt")}>View Complaints</button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
