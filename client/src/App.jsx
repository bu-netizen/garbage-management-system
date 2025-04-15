import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import OTPLogin from "./pages/OTPLogin";
import Public from "./pages/Public";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageDriver from "./pages/ManageDriver";
import Driver from "./pages/Driver";
import ManageBin from "./pages/ManageBin";
import Viewcmplt from "./pages/Viewcmplt";
import AssignDriver from "./pages/AssignDriver";
import PublicDashboard from "./pages/PublicDashboard";
import ComplainStatus from "./pages/ComplainStatus";
import DriverDashboard from "./pages/dashboard/driver/page";
import "./App.css";
import UserLogin from "../src/pages/auth/Login";
import UserRegister from "../src/pages/auth/Register";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/services" element={<Services />} />
				<Route path="/login" element={<UserLogin />} />
				<Route path="/register" element={<UserRegister />} />
				<Route path="/Admin" element={<OTPLogin />} />
				<Route path="/AdminDashboard" element={<AdminDashboard />} />
				<Route path="/Public" element={<Public />} />
				<Route path="/ManageDriver" element={<ManageDriver />} />
				<Route path="/Driver" element={<Driver />} />
				<Route path="/ManageBin" element={<ManageBin />} />
				<Route path="/PublicDashboard" element={<PublicDashboard />} />
				<Route path="/view-cmplt" element={<Viewcmplt />} />
				<Route path="/assignDriver" element={<AssignDriver />} />
				<Route path="/status" element={<ComplainStatus />} />
				<Route path="/driver-dashboard" element={<DriverDashboard />} />
			</Routes>
		</>
	);
}

export default App;
