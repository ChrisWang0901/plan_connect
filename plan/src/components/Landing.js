import React from "react";

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
          <a href="register.html" className="btn btn-primary hvr-grow-shadow">
            Sign Up
          </a>
          <a href="login.html" className="btn btn-primary hvr-grow-shadow">
            Login
          </a>
        </div>
      </div>
    </section>
  );
};

export default Landing;
