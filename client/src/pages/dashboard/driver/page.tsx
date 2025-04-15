import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "../../../components/CountUp";
import GloingText from "../../../components/GloingText";
import { Link } from "react-router-dom";
interface Complaint {
	_id: string;
	dumpType: string;
	estimatedSize: string;
	location: string;
	nearestYard: string;
	complaint: string;
	status: string;
}
interface Staus {
	Approved: number | null;
	Pending: number | null;
}
function DriverDashboard() {
	const [complaints, setComplaints] = useState<Complaint[]>([]);
	const [status, setStatus] = useState<Staus>();
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const [complaintsResponse, statusResponse] = await Promise.all([
				axios.get("http://localhost:5001/api/complaints/all"),
				axios.get("http://localhost:5001/api/drivers/status"),
			]);

			// Set the responses in state
			setComplaints(complaintsResponse.data || []);
			setStatus(statusResponse.data || undefined);
		} catch (error: any) {
			console.error("Error fetching data:", error.message);
		}
	};
	const updateStatus = async (id: string, status: string) => {
		try {
			await axios.put(`http://localhost:5001/api/complaints/status/${id}`, {
				status,
			});
			fetchData();
		} catch (error: any) {
			console.error("Error updating status:", error.message);
		}
	};
	return (
		<div className="h-dvh p-4 sm:p-8 bg-blue-50">
			<h1 className="text-5xl font-semibold text-center my-5">
				Driver Dashboard
			</h1>
			<div className="flex gap-4 flex-wrap justify-center mb-7">
				<div className="card w-96 bg-base-100 card-lg shadow-sm">
					<div className="card-body">
						<h2 className="text-2xl font-medium">
							<CountUp
								to={(status?.Approved || 0) + (status?.Pending || 0)}
								from={0}
								delay={0}
								duration={1}
							/>
						</h2>

						<h2 className="card-title">
							<GloingText
								className=""
								colors={["#ffaa40", "#ff8800", "#ffcc66"]}
							>
								Total Collections
							</GloingText>
						</h2>
					</div>
				</div>
				<div className="card w-96 bg-base-100 card-lg shadow-sm">
					<div className="card-body">
						<h2 className="text-2xl font-medium">
							<CountUp
								to={status?.Approved || 0}
								from={0}
								delay={0}
								duration={2}
							/>
						</h2>
						<h2 className="card-title">
							<GloingText colors={["#9c40ff", "#c040ff", "#e080ff"]}>
								Completed
							</GloingText>
						</h2>
					</div>
				</div>
				<div className="card w-96 bg-base-100 card-lg shadow-sm">
					<div className="card-body">
						<h2 className="text-2xl font-medium">
							<CountUp
								to={status?.Pending || 0}
								from={0}
								delay={0}
								duration={2}
							/>
						</h2>
						<h2 className="card-title">
							<GloingText colors={["#ffaa40", "#ff6f61", "#ffc371"]}>
								Remaning
							</GloingText>
						</h2>
					</div>
				</div>
			</div>
			<section className="">
				<header className="flex items-center justify-between">
					<h3 className="text-2xl">Recents</h3>
					<Link to="/complaints">See all</Link>
				</header>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3  gap-4 place-content-center">
					{complaints.map((item) => (
						<div className="card w-96 bg-base-100 card-md shadow-sm">
							<div className="card-body">
								<h2 className="card-title">{item.dumpType}</h2>
								<p>
									{item.estimatedSize} at {item.location}
								</p>
								<h3 className="">Nearest Yard: {item.nearestYard}</h3>
								<div className="justify-end card-actions">
									<button
										className="btn btn-success rounded-lg"
										disabled={item.status === "Approved"}
										onClick={() => updateStatus(item._id, "Approved")}
									>
										Collected
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

export default DriverDashboard;
