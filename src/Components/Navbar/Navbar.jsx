// src/Components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white">
      <div className="d-flex align-items-center gap-4">
        <h4 className="logo text-primary m-0">Facehiring !</h4>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/job" className="nav-link">Job</Link>
        <Link to="/network" className="nav-link">My Network</Link>
        <Link to="/competitions" className="nav-link">Competitions</Link>
      </div>

      <div className="d-flex align-items-center gap-3">
        <input
          type="text"
          placeholder="Search"
          className="form-control rounded-pill px-3"
          style={{ width: "200px" }}
        />
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <FaEnvelope size={20} />
        <FaBell size={20} />
        <FaUserCircle size={24} />
      </div>
    </nav>
  );
};

export default Navbar;
