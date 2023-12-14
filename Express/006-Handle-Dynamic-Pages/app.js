const express = require("express");
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const dirPath = path.join(__dirname, "views", "404.html");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes.routes);
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
