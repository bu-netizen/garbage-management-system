import React, { useEffect, useState } from "react";
import axios from "axios";
interface Complaint {
	_id: string;
	dumpType: string;
	estimatedSize: string;
	location: string;
	nearestYard: string;
	complaint: string;
	status: string;
}
const ComplainStatus = () => {
	const [complaints, setComplaints] = useState<Complaint[]>([]);

	useEffect(() => {
		fetchComplaints();
	}, []);

	const fetchComplaints = async () => {
		try {
			const response = await axios.get(
				"http://localhost:5001/api/complaints/all",
				{ withCredentials: true }
			);
			setComplaints(response.data || []);
		} catch (error: any) {
			console.error("Error fetching complaints:", error.message);
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
				🧾 Submitted Complaints
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
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ComplainStatus;
