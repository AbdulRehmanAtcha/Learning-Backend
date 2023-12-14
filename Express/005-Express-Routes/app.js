const express = require("express");
const path = require("path");

const dirPath = path.join(__dirname, "views", "404.html");
console.log(dirPath);

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.get("/", (req, res, next) => {
  res.send("Hello Home");
});

app.use((req, res, next) => {
  res.sendFile(dirPath);
});

app.listen(3100, () => {
  console.log("Server Started");
});
