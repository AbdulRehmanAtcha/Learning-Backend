import express from "express";
// import { registeredProducts } from "./admin.js";
import { GetAllProducts, GetById } from "../controllers/productController.js";

const router = express.Router();

router.get("/all-products", GetAllProducts);

router.get("/product/:id", GetById)


export default router;
