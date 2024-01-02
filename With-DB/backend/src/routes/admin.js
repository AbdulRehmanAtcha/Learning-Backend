import express from "express";
import {
  AddProduct,
  DeleteProductController,
  EditProductController,
} from "../controllers/productController.js";

export const adminRoutes = express.Router();

adminRoutes.post("/add-product", AddProduct);

adminRoutes.post("/edit-product", EditProductController);

adminRoutes.post("/delete-product", DeleteProductController);
