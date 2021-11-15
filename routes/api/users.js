const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/test", (req, res) => {
  res.json({ msg: "This is the users route" });
});
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  // Check to make sure nobody has already registered with a duplicate email
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      // Throw a 400 error if the email address already exists
      return res
        .status(400)
        .json({ email: "A user has already registered with this address" });
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
module.exports = router;
