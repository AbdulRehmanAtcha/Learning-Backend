import express from "express";

import {
  AddProductCart,
  GetAllProducts,
  GetById,
  GettingCartItems,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/all-products", GetAllProducts);

router.get("/product/:id", GetById);

router.post("/addToCart", AddProductCart);

router.get("/cartItems", GettingCartItems);

export default router;
