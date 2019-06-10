const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

// Check if the user is registered
// If not: redirect to login
const loginRedirect = (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    res.redirect("/api/users/login");
  } else {
    next();
  }
};

//@route  /api/users/login
//@desc   login page
//@access Public
router.get("/login", (req, res) => {
  res.send(`
    <h1>Login page</h1>
    <form action="/api/users/login" method="post">
      <input type="email" name="email" placeholder="Email" required/>
      <input type="password" name="password" placeholder="password" required/>
      <input type="submit"/>
    </form>
  `);
});

//@route  /api/users/login
//@desc   login user
//@access Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Fill all the fields" });
  }

  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: "No such user in the DB" });

      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

        req.session.userId = user.id;
        res.json({
          loggedUser: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        });
      });
    })
    .catch(err => console.log("From FIND ONE CATCH", err));
});

//@route  /api/users/all
//@desc   show all users
//@access Private
router.get("/all", loginRedirect, (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err));
});

//@route  /api/users/register
//@desc   Register new user
//@access Public
router.get("/register", (req, res) => {
  res.send(`
    <h1>Register here</h1>
    <form action="/api/users/register" method="post">
      <label for="name">Name</label>
      <input type="text" id="name" name="name"/>
      <label for="email">Email</label>
      <input type="email" id="email" name="email"/>
      <label for="password">Password</label>
      <input type="password" id="password" name="password"/>
      <input type="submit"/>
    </form>
  `);
});

//@route  /api/users/register
//@desc   Register new user
//@access Public
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  if (!name || !email || !password) {
    res.status(400).json({ msg: "Fill all the fields" });
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const newUser = new User({
        name,
        email,
        password
      });

      // hash the password
      bcrypt.hash(newUser.password, 10).then(hash => {
        newUser.password = hash;
        // save new user to the DB
        newUser.save().then(user =>
          res.json({
            loggedUser: {
              name: user.name,
              email: user.email,
              id: user._id
            }
          })
        );
        // set identifier to the session i.e. if the user is
        // registered he's allowed to visit privat routes
        req.session.userId = newUser.id;
        console.log("User id in the session: ", req.session.userId);
      });
    })
    .catch(err => console.log(err));
});

//@route  POST /api/users/logout
//@descr  Destroy the session
//@acces  Private
router.post("/logout", loginRedirect, (req, res) => {
  req.session.destroy(err => {
    if (err) return res.redirect("/home");
  });

  res.clearCookie("MY_SESSION");
  res.redirect("/api/users/login");
});

module.exports = router;
