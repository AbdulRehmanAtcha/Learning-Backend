const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const allNames = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/name", (req, res, next) => {
  allNames.push(req.body);
  res.redirect("/users");
});

app.use("/add-name", (req, res, next) => {
  res.send(`
    <form action="/name" method="POST">
    <input type="text" name="YourName" placeholder="Enter Your Name"/>
    <button type="submit">Send</button>
    </form>`);
});
app.use("/users", (req, res, next) => {
  res.send(allNames);
});

app.use("/", (req, res, next) => {
  res.send("Hello Home");
});

app.listen(3100, () => {
  console.log("Server Started");
});
