import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(data);
  };
  return (
    <Fragment>
      <section className="container">
        <p className="text-sm">
          <i className="material-icons icon-sm">person</i> Log onto Your Account
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minlength="6"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="m-1-0">
          Already have an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Login;
