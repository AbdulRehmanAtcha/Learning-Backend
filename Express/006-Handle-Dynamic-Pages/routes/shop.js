const express = require("express");
const data = require("./admin")
const path = require("path");


const dirPath = path.join(__dirname, "../" , "views", "home.html")
const dirPath2 = path.join(__dirname, "../" , "views", "products.html")

const router = express.Router();

router.get("/", (req, res, next) => {
  // res.send("Hello Home");
  res.sendFile(dirPath);
});

router.use("/products", (req, res, next) => {
  console.log(data.products)
  res.sendFile(dirPath2);
});

module.exports = router;
