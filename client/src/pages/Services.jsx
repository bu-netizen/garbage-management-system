import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Waste Collection",
    image: "https://static.vecteezy.com/system/resources/thumbnails/011/457/135/small_2x/plastic-bins-with-waste-free-vector.jpg",
    description: "Door-to-door collection: Waste is collected from individual homes and businesses.",
  },
  {
    title: "Waste Sorting",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIkYyFmcrYXla80osumUT4riK_M7zOldkRMEszW_n3FDAAH62DkenM1p60jlec_pz9yHA&usqp=CAU",
    description: "Recycling facilities: Materials are processed and prepared for reuse or recycling.",
  },
  {
    title: "Waste Disposal",
    image: "https://cdn-icons-png.flaticon.com/256/8134/8134342.png",
    description: "Landfills: Waste is buried in designated areas to prevent environmental contamination.",
  },
  {
    title: "Monitoring",
    image: "https://cdn-icons-png.flaticon.com/256/10517/10517468.png",
    description: "Waste tracking systems: Track the flow of waste from collection to disposal.",
  },
];

const Services = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setAnimate(true), 500);
  }, []);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <nav
        style={{
          ...styles.sidebar,
          width: sidebarActive ? "250px" : "10px",
        }}
      >
        {sidebarActive && (
          <>
            <h2 style={styles.menuTitle}>Menu</h2>
            <ul style={styles.menuList}>
              {[
                { name: "Home", path: "/" },
                { name: "Sign-in", path: "/OTPLogin" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name} style={styles.menuItem}>
                  <button onClick={() => navigate(item.path)} style={styles.menuButton}>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>

      {/* Sidebar Toggle Button */}
      <div style={styles.toggleButton} onClick={toggleSidebar}>
        <div style={styles.toggleLine}></div>
        <div style={styles.toggleLine}></div>
        <div style={styles.toggleLine}></div>
      </div>

      {/* Services Section */}
      <div style={styles.servicesContainer}>
        {services.map((service, index) => {
          const angle = (index / services.length) * 2 * Math.PI;
          const x = Math.cos(angle) * 200;
          const y = Math.sin(angle) * 200;

          return (
            <div
              key={index}
              style={{
                ...styles.serviceBox,
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                opacity: animate ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${animate ? 1 : 0.5})`,
                transition: `opacity 0.5s ease ${index * 0.3}s, transform 0.5s ease ${index * 0.3}s`,
              }}
            >
              <img src={service.image} alt={service.title} style={styles.image} />
              <h2 style={styles.serviceTitle}>{service.title}</h2>
              <p style={styles.description}>{service.description}</p>
            </div>
          );
        })}
      </div>

      {/* Experience Button */}
      <button 
  style={styles.experienceButton} 
  onClick={() => navigate("/OTPLogin")}
>
  Experience the Services
</button>

    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "url('https://www.greenwarrior.co.in/images/resource/16.jpg')", // Clean city background
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  sidebar: {
    height: "100vh",
    background: "#035992",
    color: "#fff",
    transition: "all 0.3s ease",
    position: "fixed",
    left: 0,
    overflow: "hidden",
  },
  menuTitle: {
    textAlign: "center",
    padding: "10px",
    color: "white",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
  },
  menuItem: {
    lineHeight: "60px",
    borderTop: "1px solid #9999",
    color: "white"
  },
  menuButton: {
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
  },
  toggleButton: {
    position: "absolute",
    left: "20px",
    top: "18px",
    cursor: "pointer",
  },
  toggleLine: {
    width: "29px",
    height: "3px",
    background: "#000",
    margin: "4px",
  },
  servicesContainer: {
    position: "relative",
    width: "500px",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  serviceBox: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "15px",
    textAlign: "center",
    overflow: "hidden",
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    padding: "15px",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  },
  image: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    marginBottom: "10px",
  },
  serviceTitle: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  description: {
    fontSize: "12px",
    color: "#333",
  },
  experienceButton: {
    position: "relative",
    bottom: "45%",
    padding: "10px 2px",
    width:"12%",
    background: "#035992",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
};

export default Services;
