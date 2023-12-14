const express = require("express");
const path = require("path");

const dirPath = path.join(__dirname, "../" , "views", "shop.html")

const router = express.Router();

router.get("/", (req, res, next) => {
  // res.send("Hello Home");
  res.sendFile(dirPath);
});

router.use("/products", (req, res, next) => {
  res.send("Hello Products");
});

module.exports = router;
