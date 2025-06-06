import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Driver = () => {
	const [drivers, setDrivers] = useState([]);
	const [driverName, setDriverName] = useState("");
	const [licenseNumber, setLicenseNumber] = useState("");
	const [disable, setDisable] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const savedDrivers = localStorage.getItem("drivers");
		if (savedDrivers) {
			setDrivers(JSON.parse(savedDrivers));
		}
	}, []);

	const handleLogin = () => {
		setDisable(true);
		axios
			.post("http://localhost:5001/api/drivers/login", {
				name: driverName,
				licenseNumber,
			},{withCredentials: true})
			.then((_) => navigate("/driver-dashboard"))
			.catch((err) => {
				console.log(err);
				alert(err.response.data.message || "Driver not found.");
			})
			.finally(() => setDisable(false));
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				background: "#f5f5f5",
			}}
		>
			<div
				style={{
					padding: "20px",
					background: "white",
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
					borderRadius: "8px",
				}}
			>
				<h2 style={{ textAlign: "center" }}>Driver Login</h2>
				<input
					type="text"
					placeholder="Driver Name"
					value={driverName}
					onChange={(e) => setDriverName(e.target.value)}
					style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
				/>
				<input
					type="text"
					placeholder="License Number"
					value={licenseNumber}
					onChange={(e) => setLicenseNumber(e.target.value)}
					style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
				/>
				<button
					onClick={handleLogin}
					disabled={disable}
					className="btn btn-secondary rounded-lg m-auto"
				>
					Login
				</button>
			</div>
		</div>
	);
};

export default Driver;
