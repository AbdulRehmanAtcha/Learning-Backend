const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Hello Home");
});

router.use("/products", (req, res, next) => {
  res.send("Hello Products");
});

module.exports = router;
