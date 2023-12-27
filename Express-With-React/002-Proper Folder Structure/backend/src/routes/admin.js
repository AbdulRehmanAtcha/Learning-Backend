import express from "express";
import bodyParser from "body-parser";
import { AddProduct, AddProductCart } from "../controllers/productController.js";

export const adminRoutes = express.Router();

adminRoutes.use(bodyParser.json());
adminRoutes.use(bodyParser.urlencoded({ extended: true }));

// export const registeredProducts = [];

adminRoutes.post("/add-product", AddProduct);
adminRoutes.post("/addToCart", AddProductCart);
