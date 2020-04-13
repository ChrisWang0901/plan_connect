import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/index">
          <i className="fas fa-code"></i> PlanConnect
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/profiles">Community</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
