const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const keys = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/test", (req, res) => {
  res.json({ msg: "This is the users route" });
});
// router.get(
//   "/current",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       handle: req.user.handle,
//       email: req.user.email,
//     });
//   }
// );

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Check to make sure nobody has already registered with a duplicate email
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      // Otherwise create a new user
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
      });

      //genSalt(10 is number of routes we generate the salt, callback will invoke after salt)
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.send(user))
            .catch((err) => res.send(err));
        });
      });
    }
  });
});
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    if (!user) {
      // Throw a 400 error if the email address already exists
      errors.email = "User not found";
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        res.json({ msg: "Success" });
        // const payload = {
        //   id: user.id,
        //   handle: user.handle,
        //   email: user.email,
        // };
        // jwt.sign(
        //   payload,
        //   keys.secretOrKey,
        //   { expiresIn: 3600 },
        //   (err, token) => {
        //     res.json({
        //       sucess: true,
        //       token: "Bearer" + token,
        //     });
        //   }
        // );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;

//user?