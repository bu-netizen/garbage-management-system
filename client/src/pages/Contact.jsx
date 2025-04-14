import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim() || /\d/.test(formData.name)) newErrors.name = "Valid name is required (No numbers)";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:5001/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          setSuccessMessage("Form submitted successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
          setErrors({});
        } else {
          alert(data.message || "Something went wrong!");
        }
      } catch (error) {
        alert("Failed to connect to server.");
      }
    }
  };

  return (
    <div style={{ display: "flex", width: "100%", position: "relative" }}>
      <nav
        style={{
          width: sidebarActive ? "250px" : "60px",
          height: "100vh",
          background: "#035992",
          color: "#fff",
          transition: "all 0.3s ease",
          position: "fixed",
          left: 0,
          overflow: "hidden",
          boxShadow: "4px 0 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <button onClick={() => setSidebarActive(!sidebarActive)} style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer", padding: "10px" }}>☰</button>
        {sidebarActive && (
          <>
            <h2 style={{ textAlign: "center", padding: "10px", color: "white" }}>Menu</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[{ name: "Home", path: "/" },
                { name: "Sign-in", path: "/signin" },
                { name: "About", path: "/about" },
                { name: "Service", path: "/services" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name} style={{ lineHeight: "60px", borderTop: "1px solid #555" }}>
                  <button
                    onClick={() => navigate(item.path)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 20px",
                      color: "pink",
                      background: "none",
                      border: "none",
                      fontWeight: "600",
                      fontSize: "19px",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>

      <div
        style={{
          width: sidebarActive ? "calc(100% - 250px)" : "calc(100% - 60px)",
          marginLeft: sidebarActive ? "250px" : "60px",
          minHeight: "100vh",
          padding: "20px",
          transition: "all 0.3s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F3E5F5",
          color: "#2C3E50",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1 style={{ color: "#8E44AD", fontSize: "2.5rem", marginBottom: "10px" }}>Contact Us</h1>
        <h4 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Garbage Management Services</h4>
        <p style={{ color: "#34495E", fontSize: "1.2rem" }}>Contact our teams for support.</p>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <form 
          onSubmit={handleSubmit} 
          style={{ width: "80%", maxWidth: "500px", textAlign: "left", marginTop: "20px", padding: "20px", background: "rgba(142, 68, 173, 0.2)", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
        >
          {Object.values(errors).map((error, index) => (
            <p key={index} style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>
          ))}
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} style={{ width: "80%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #BDC3C7" }} />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} style={{ width: "80%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #BDC3C7" }} />
          <input type="text" name="subject" placeholder="Your Subject" value={formData.subject} onChange={handleChange} style={{ width: "80%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #BDC3C7" }} />
          <textarea name="message" placeholder="Your Message..." rows="5" value={formData.message} onChange={handleChange} style={{ width: "80%", padding: "10px", borderRadius: "5px", border: "1px solid #BDC3C7" }}></textarea>
          <button type="submit" style={{ width: "50%", padding: "10px", background: "#8E44AD", color: "white", fontSize: "1rem", borderRadius: "5px", cursor: "pointer", border: "none", marginTop: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
