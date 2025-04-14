import React,{useState} from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";


const About = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        backgroundImage: "url('https://wp-website.safetyculture.com/wp-content/uploads/sites/3/2023/12/Waste-Management-Life-Cycle.png')",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "66% 69%",
        backgroundColor:" rgba(240, 6, 52, 0.3)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar Menu */}
      <nav
        style={{
          width: sidebarActive ? "250px" : "10px",
          height: "100vh",
          background: "#035992",
          color: "white",
          transition: "all 0.3s ease",
          position: "fixed",
          left: 0,
          overflow: "hidden",
        }}
      >
        {sidebarActive && (
          <>
        
            <h2 style={{ textAlign: "center", padding: "10px" }}>Menu</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                { name: "Home", path: "/" },
                { name: "Sign-in", path: "/signin" },
                { name: "About", path: "/about" },
                { name: "Service", path: "/services" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name} style={{ lineHeight: "60px", borderTop: "1px solid #9999" }}>
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
      <div style={{ flex: 1, textAlign: "center", padding: "20px" }}>
        <div
          style={{ position: "absolute", left: "20px", top: "18px", cursor: "pointer" }}
          onClick={toggleSidebar}
        >
          <div style={{ width: "29px", height: "3px", background: "#000", margin: "4px" }}></div>
          <div style={{ width: "29px", height: "3px", background: "#000", margin: "4px" }}></div>
          <div style={{ width: "29px", height: "3px", background: "#000", margin: "4px" }}></div>
        </div>
        <header>
          <h1 style={{ color: "#002a54ef", textShadow: "5px 3px 5px rgb(246, 245, 245)" }}>
          About Garbage Management System
          </h1>
        </header>
        <br />
        
       
        
      </div>
      {/* Right Pink Sidebar */}
      <div
        style={{
          width: sidebarActive ? "250px" : "10px",
          height: "100vh",
          background: "pink",
          position: "fixed",
          right: 0,
          transition: "all 0.3s ease",
        }}
      ></div>
      {/* Footer */}
      <footer style={{ backgroundColor: "rgba(138, 43, 226, 0.5)", color: "#fff", padding: "10px", width: "100%", position: "fixed", bottom: 0, textAlign: "center" }}>
        <p>&copy; 2025 Garbage Management. All rights reserved.</p>
        <div>
          {[
            { name: "Facebook", icon: "fab fa-facebook-f" },
            { name: "Twitter", icon: "fab fa-twitter" },
            { name: "Instagram", icon: "fab fa-instagram" },
            { name: "LinkedIn", icon: "fab fa-linkedin" },
          ].map((social, index) => (
            <button
              key={index}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "20px",
                margin: "0 5px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              <i className={social.icon}></i>
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default About;
