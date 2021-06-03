const loginRoute = require("express").Router();
const models = require("../models");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
loginRoute.use(express.urlencoded({ extended: true }));
loginRoute.use(cors());
process.env.SECRET = "Berlin";

loginRoute.post("/register", (req, res) => {
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };

  models.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) throw err;
        userData.password = hash;
        models.User.create(userData)
          .then((user) => {
            res.json({ status: `${user.email} has been registred` });
          })
          .catch((err) => res.send(err));
      });
    } else {
      res.json("User already exists");
    }
  });
});

loginRoute.post("/login", (req, res) => {
  models.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(user.dataValues, process.env.SECRET, {
          expiresIn: "1h",
        });
        res.send(token);
      } else {
        res.send("Wrong password");
      }
    } else {
      res.json("User does not exists");
    }
  });
});

loginRoute.get("/profile", (req, res) => {
  const decoded = jwt.verify(req.headers["authorization"], process.env.SECRET);

  models.User.findOne({
    where: {
      id: decoded.id,
    },
  }).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.send("User does not exists");
    }
  });
});

module.exports = loginRoute;
