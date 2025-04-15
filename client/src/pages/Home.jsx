import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div style={{ display: "flex", width: "100%", position: "relative" }}>
      {/* Left Blue Sidebar */}
      <nav
        style={{
          width: sidebarActive ? "250px" : "10px",
          height: "100vh",
          background: "#035992",
          color: "#fff",
          transition: "all 0.3s ease",
          position: "fixed",
          left: 0,
          overflow: "hidden",
        }}
      >
        {sidebarActive && (
          <>
            <h2 style={{ textAlign: "center", padding: "10px", color: "white" }}>Menu</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                { name: "Home", path: "/" },
                { name: "Sign-in", path: "/login" },
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

      {/* Right Pink Sidebar */}
      <nav
        style={{
          width: sidebarActive ? "250px" : "10px",
          height: "100vh",
          background: "pink",
          position: "fixed",
          right: 0,
          transition: "all 0.3s ease",
          overflow: "hidden",
        }}
      >
        {sidebarActive && (
          <>
            <h2 style={{ textAlign: "center", padding: "10px", color: "black" }}>Login</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                { name: "Admin Login", path: "/Admin" },
                { name: "Driver Login", path: "/Driver" },
              ].map((item) => (
                <li key={item.name} style={{ lineHeight: "60px", borderTop: "1px solid #9999" }}>
                  <button
                    onClick={() => navigate(item.path)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 20px",
                      color: "#000",
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

      {/* Main Content */}
      <div
        style={{
          width: sidebarActive ? "calc(100% - 500px)" : "calc(100% - 20px)",
          marginLeft: sidebarActive ? "250px" : "10px",
          marginRight: sidebarActive ? "250px" : "10px",
          minHeight: "100vh",
          padding: "20px",
          transition: "all 0.3s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('https://i.pinimg.com/originals/e1/e2/4f/e1e24f24228256f020f1b8fd0706edb8.gif')",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Menu Toggle Button */}
        <div
          style={{ position: "absolute", left: "20px", top: "18px", cursor: "pointer" }}
          onClick={toggleSidebar}
        >
          <div style={{ width: "29px", height: "3px", background: "#000", margin: "4px" }}></div>
          <div style={{ width: "29px", height: "3px", background: "#000", margin: "4px" }}></div>
          <div style={{ width: "29px", height: "3px", background: "#000", margin: "4px" }}></div>
        </div>

        {/* Content Text */}
        <h1 style={{ color: "rgb(69, 15, 249)", fontSize: "30px", fontStyle: "oblique" }}>
          Garbage Management System
        </h1>
        <h3 style={{ color: "black", marginBottom: "20px" }}>
          This management system focuses on the benefits of a clean environment.
        </h3>
        <div
          style={{
            display: "flex",
            overflow: "hidden",
            whiteSpace: "nowrap",
            animation: "marquee 10s linear infinite",
            boxShadow: "0px 0px 10px rgba(36, 88, 21, 0.5)",
            borderRadius: "10px",
          }}
        >
          <div style={{ fontSize: "2em", marginRight: "20px", animation: "textAnimation 5s linear infinite" }}>
            Welcome to Garbage Management Services
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
