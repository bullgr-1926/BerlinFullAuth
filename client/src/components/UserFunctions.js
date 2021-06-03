import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("http://localhost:3002/register", newUser)
    .then((response) => {
      console.log("Registered");
    });
};

export const login = (user) => {
  return axios
    .post("http://localhost:3002/login", user)
    .then((response) => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
