const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
 



app.use("/admin",adminRoutes);
app.use(shopRoutes);



app.get("/", (req, res, next) => {
  res.send("Hello Home");
});

app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

app.listen(3100, () => {
  console.log("Server Started");
});
