import express from "express";
import { registeredProducts } from "./admin.js";

const router = express.Router();

router.get("/all-products", (req, res) => {
  res.send(registeredProducts);
});



export default router;
