import React from "react";
import { useNavigate } from "react-router-dom";

import {
	FaPlusCircle, // For Create Bin
	FaUserTie, // For Manage Driver
	FaRoute, // For Assign Best Route
	FaChartLine, // For View Garbage Report
} from "react-icons/fa";
import "./AdminDashboard.css"; // CSS file for styling

const AdminDashboard = () => {
	const navigate = useNavigate();

	return (
		<div className="dashboard-container max-h-dvh overflow-hidden">
			<h2 className="dashboard-title">Admin Dashboard</h2>
			<h3 className="dashboard-subtitle">
				Manage and monitor garbage collection
			</h3>

			<div className="flex flex-wrap grow shrink gap-5 justify-center">
				{/* Manage Bin */}
				<div className="grid-item create-bin basis-72">
					<FaPlusCircle className="grid-icon" />
					<button
						className="dashboard-button"
						onClick={() => navigate("/ManageBin")}
					>
						Create Bin
					</button>
				</div>

				{/* Manage Driver */}
				<div className="grid-item ManageDrive basis-72">
					<FaUserTie className="grid-icon" />
					<button
						className="dashboard-button"
						onClick={() => navigate("/ManageDriver")}
					>
						Manage Driver
					</button>
				</div>

				{/* Assign Best Route */}
				<div className="grid-item basis-72 assign-route">
					<FaRoute className="grid-icon" />
					<button
						className="dashboard-button"
						onClick={() => navigate("/assignDriver")}
					>
						Assign Driver
					</button>
				</div>

				{/* View Garbage Report */}
				<div className="grid-item basis-72 garbage-report">
					<FaChartLine className="grid-icon" />
					<button
						className="dashboard-button"
						onClick={() => navigate("/view-cmplt")}
					>
						View Garbage Report
					</button>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
