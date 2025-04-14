import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Header.css";

function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      <h1 className="logo">My Website</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </motion.header>
  );
}

export default Header;