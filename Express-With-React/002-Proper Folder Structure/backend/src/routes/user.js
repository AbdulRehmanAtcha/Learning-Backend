import express from "express";

import {
  AddProductCart,
  GetAllProducts,
  GetById,
} from "../controllers/productController.js";

const router = express.Router();


router.get("/all-products", GetAllProducts);

router.get("/product/:id", GetById);

router.post("/addToCart", AddProductCart);

export default router;
