import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@example.com";
  const ADMIN_OTP = "123456";

  const handleEmailSubmit = () => {
    if (email === ADMIN_EMAIL) {
      setTimeout(() => {
        setOtpSent(true);
        setMessage("OTP has been sent to your email.");
      }, 2000);
    } else {
      setMessage("Invalid admin email.");
    }
  };

  const verifyOTP = () => {
    if (otp === ADMIN_OTP) {
      localStorage.setItem("admin-token", "verified");
      navigate('/AdminDashboard');
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      borderRadius: "10px",
      background: "#f8f9fa",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      textAlign: "center"
    }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Admin Login</h2>
      {!otpSent ? (
        <>
          <input
            type="email"
            placeholder="Enter Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "85%",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px"
            }}
          />
          <button style={{
            width: "60%",
            padding: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            cursor: "pointer"
          }} onClick={handleEmailSubmit}>Submit</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              width: "85%",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px"
            }}
          />
          <button style={{
            width: "75%",
            padding: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            cursor: "pointer"
          }} onClick={verifyOTP}>Verify OTP</button>
        </>
      )}
      <p style={{ marginTop: "15px", color: "red", fontSize: "14px" }}>{message}</p>
    </div>
  );
}

export default AdminLogin;
