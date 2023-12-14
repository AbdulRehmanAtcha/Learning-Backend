const express = require("express");
const path = require("path");

const dirPath = path.join(__dirname, "../", "views", "add-product.html");

const router = express.Router();

const products = [];

router.post("/product", (req, res, next) => {
  products.push(req.body)
  res.redirect("/products");
});

router.get("/add-product", (req, res, next) => {
  res.sendFile(dirPath);
});

// module.exports = router;
exports.routes = router;
exports.products = products;
