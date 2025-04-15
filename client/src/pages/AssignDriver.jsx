import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewComplaints = () => {
	const [complaints, setComplaints] = useState([]);
	const [drivers, setDrivers] = useState([]);
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const [complaintsRes, driversRes] = await Promise.all([
				axios.get("http://localhost:5001/api/complaints/assign-driver"),
				axios.get("http://localhost:5001/api/drivers/all"),
			]);
			console.log(complaintsRes.data);
			setComplaints(complaintsRes.data || []);
			setDrivers(driversRes.data || []);
		} catch (error) {
			console.error("Error fetching data:", error.message);
		}
	};

	const updateStatus = async (id, driver) => {
		try {
			await axios.put(`http://localhost:5001/api/complaints/status/${id}`, {
				driver,
			});
			fetchData(); // Refresh after update
			alert("Status updated successfully!");
		} catch (error) {
			console.error("Error updating status:", error.message);
		}
	};

	return (
		<div
			style={{
				padding: "2rem",
				backgroundColor: "#f9fafb",
				minHeight: "100vh",
				fontFamily: "sans-serif",
			}}
		>
			<h2
				style={{
					fontSize: "28px",
					textAlign: "center",
					marginBottom: "1.5rem",
					color: "#2d3748",
				}}
			>
				Assign Drivers
			</h2>

			{complaints.length === 0 ? (
				<p style={{ textAlign: "center", color: "gray" }}>
					No complaints submitted yet.
				</p>
			) : (
				<div style={{ display: "grid", gap: "1.5rem" }}>
					{complaints.map((item) => (
						<div
							key={item._id}
							style={{
								backgroundColor: "white",
								padding: "1rem",
								borderRadius: "10px",
								boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
							}}
						>
							<p>
								<strong>Type:</strong> {item.dumpType}
							</p>
							<p>
								<strong>Size:</strong> {item.estimatedSize}
							</p>
							<p>
								<strong>Location:</strong> {item.location}
							</p>
							<p>
								<strong>Nearest Yard:</strong> {item.nearestYard}
							</p>
							<p>
								<strong>Description:</strong> {item.complaint}
							</p>
							<p>
								<strong>Status:</strong> {item.status || "Pending"}
							</p>
							{item.driver && (
								<p>
									<strong>Driver:</strong> {item.driver.name} (
									{item.driver.licenseNumber})
								</p>
							)}

							<fieldset className="fieldset">
								<legend className="fieldset-legend">Assign Driver</legend>
								<select
									defaultValue={item.driver?._id || ""}
									className="select"
									onChange={(e) => {
										const driverId = e.target.value;
										if (driverId) {
											updateStatus(item._id, driverId);
										}
									}}
								>
									<option disabled value="">
										Pick a driver
									</option>
									{drivers?.map((driver) => (
										<option key={driver._id} value={driver._id}>
											{driver.name} - {driver.vehicle}
										</option>
									))}
								</select>
							</fieldset>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ViewComplaints;
