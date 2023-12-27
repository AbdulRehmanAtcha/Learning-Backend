import express from "express";
import { AddProduct} from "../controllers/productController.js";

export const adminRoutes = express.Router();

adminRoutes.post("/add-product", AddProduct);
