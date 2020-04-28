import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <section className="landing">
      <div className="overlay"></div>
      <div className="landing-inner">
        <h1 className="text-xl">PlanConnect</h1>
        <p className="text-sm">
          Join PlanConnect, and start sharing ideas and plans with other people.
        </p>
        <div className="buttons">
          <Link to="/register" className="btn btn-primary hvr-grow-shadow">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-primary hvr-grow-shadow">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
