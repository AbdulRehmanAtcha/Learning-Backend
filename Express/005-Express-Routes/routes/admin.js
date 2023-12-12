const express = require("express");
const router = express.Router();

router.post("/product", (req, res, next) => {
  res.redirect("/products");
});

router.get("/add-product", (req, res, next) => {
  res.send(`
      <form action="/admin/product" method="POST">
      <input type="text" name="product" placeholder="Enter Product"/>
      <button type="submit">Send</button>
      </form>`);
});

module.exports = router;
