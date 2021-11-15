const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require("./models/User");
const bodyParser = require("body-parser"); //tell app what source of request it should response to

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
//app response to request from other software like postman
app.get("/", (req, res) => {
  const user = new User({
    handle: "hien",
    email: "hien@gmai.com",
    password: "password",
  });
  user.save();
  res.send("Hello AA");
});

app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
