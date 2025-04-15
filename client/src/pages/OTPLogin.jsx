import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OTPLogin = () => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [otp, setOtp] = useState("");
	const [step, setStep] = useState(1);
	const navigate = useNavigate();

	const sendOTP = async () => {
		try {
			await axios.post("http://localhost:5001/send-otp", { phone });
			setStep(2);
		} catch (error) {
			alert(error.response?.data?.message || "Error sending OTP");
		}
	};

	const verifyOTP = async () => {
		try {
			const res = await axios.post("http://localhost:5001/verify-otp", {
				phone: "+9170013 48465",
				code: otp,
			});
			alert(res.data.message);
			navigate("/AdminDashboard"); // Redirect to Public Page after successful login
		} catch (error) {
			alert(error.response?.data?.message || "Invalid OTP");
		}
	};

	const styles = {
		container: {
			textAlign: "center",
			padding: "30px",
			fontFamily: "Arial, sans-serif",
			background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
			height: "100vh",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		},
		box: {
			background: "white",
			padding: "20px",
			borderRadius: "10px",
			boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
			width: "300px",
		},
		input: {
			width: "90%",
			padding: "8px",
			margin: "10px 0",
			border: "1px solid #ddd",
			borderRadius: "5px",
			fontSize: "14px",
		},
		button: {
			background: "#00796b",
			color: "white",
			padding: "10px",
			fontSize: "14px",
			border: "none",
			cursor: "pointer",
			borderRadius: "5px",
			width: "100%",
			marginTop: "10px",
		},
		buttonHover: {
			background: "#004d40",
		},
		title: {
			color: "#00796b",
			marginBottom: "15px",
		},
	};

	return (
		<div style={styles.container}>
			<div style={styles.box}>
				<div>
					<h2 style={styles.title}>Enter Your OTP</h2>
					<input
						type="number"
						placeholder="OTP"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						style={styles.input}
					/>
					<br />
					<button style={styles.button} onClick={verifyOTP}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default OTPLogin;
