import React from "react";
import { useNavigate } from "react-router-dom";

const PublicDashboard = () => {
  const navigate = useNavigate();

  const handleNewComplaint = () => {
    navigate("/public");
  };

  const handleViewStatus = () => {
    navigate("/status");
  };

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Public Dashboard</h1>
      <p style={styles.quote}>
        “Cleanliness is not next to godliness, it is godliness itself. Let’s keep our surroundings clean and green!”
      </p>

      <div style={styles.buttonGroup}>
        <button onClick={handleNewComplaint} style={styles.button}>
        📝 File New Complaint
        </button>
        <button onClick={handleViewStatus} style={styles.button}>
          📋 View Complaint Status
        </button>
        <button onClick={handleHomeRedirect} style={styles.button}>
           🏠 Go to Home Page
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f0fdf4",
    padding: "40px",
    borderRadius: "12px",
    maxWidth: "600px",
    margin: "50px auto",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    color: "#1b5e20",
    marginBottom: "10px",
  },
  quote: {
    fontSize: "1rem",
    color: "#388e3c",
    marginBottom: "30px",
    fontStyle: "italic",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "80%",
    maxWidth: "300px",
    transition: "background-color 0.3s",
  },
};

export default PublicDashboard;

      
   