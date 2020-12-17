const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
// Load User model
const User = require("../models/User");
const { forwardAuthenticated } = require("../config/auth");

// Signup
router.post("/signup", (req, res) => {
  const { username, password, password2 } = req.body;
  const email = req.body.email.toLowerCase();
  let errors = [];

  if (!username || !email || !password || !password2) {
    res.send({ error: "Please, Enter all fields" });
  }

  if (password != password2) {
    res.send({ error: "Passwords do not match" });
  }

  if (password.length < 6) {
    res.send({ error: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.status(500).send("error");
  } else {
    console.log(req.body);
    User.findOne({ email: email }).then((user) => {
      if (user) {
        res.send({ error: "duplicated user" });
      } else {
        console.log(req.body);
        const newUser = new User({
          username,
          email,
          password,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((newUser) => {
                res.status(200).send("success");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");
        console.log(err);

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");
        console.log(token);
        console.log({ token, body });
        return res.json({ token, body });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;

// Login
/*router.post("/login", forwardAuthenticated, async (req, res, next) => {
  passport.authenticate("local", {
    successMessage: "auth",
    failureMessage: "Invalid Credentials.",
  }),
    res.json({ message: "Success", username: req.body.email });
});*/
