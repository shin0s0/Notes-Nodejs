const express = require("express");
const router = express.Router();
const passport = require("passport");
const { User } = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Passport Local Strategy for authentication
passport.use(new LocalStrategy({ usernameField: "email" },async (email, password, done) => {
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return done(null, false, { message: "Incorrect Email or Password" });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));


// Serialize and Deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    if (!user) return done(null, false);

    done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

// Registration GET Route 
router.get("/register", (req, res) => {
  res.render("register");
});

// Registration POST Route
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return res.render("register", { email, message: "User Already Exists, Please Login" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    res.render("register", { message: "Registered Successfully" });
  } catch (error) {
    next(error);
  }
});

// Login Route

router.get("/login", (req, res) => {
  res.render("login", { message: req.flash("error")});
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true, 
}));



// Logout Route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  });
});

module.exports = router;
