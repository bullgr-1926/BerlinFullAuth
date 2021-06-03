import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const Profile = () => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    errors: {},
  });

  useEffect(() => {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    setProfile({
      first_name: decoded.firstname,
      last_name: decoded.lastname,
      email: decoded.email,
    });
  }, []);

  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">PROFIL</h1>
        </div>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td>Fist Name</td>
              <td>{profile.first_name}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{profile.last_name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{profile.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
