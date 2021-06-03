import React, { useState } from "react";
import { register } from "./UserFunctions";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

const Register = () => {
  const [newRegister, setNewRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    errors: {},
  });

  let history = useHistory();

  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setNewRegister((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      firstname: newRegister.firstname,
      lastname: newRegister.lastname,
      email: newRegister.email,
      password: newRegister.password,
    };

    register(queryString.stringify(newUser)).then((res) => {
      history.push(`/login`);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            <div className="form-group">
              <label htmlFor="name">First name</label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                placeholder="Enter your first name"
                value={newRegister.firstname}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Last name</label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                placeholder="Enter your lastname name"
                value={newRegister.lastname}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={newRegister.email}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={newRegister.password}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-lg btn-primary btn-block">
              Register!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
