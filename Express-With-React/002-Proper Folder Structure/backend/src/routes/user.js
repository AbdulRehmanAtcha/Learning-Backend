import express from "express";
// import { registeredProducts } from "./admin.js";
import { GetAllProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/all-products", GetAllProducts);



export default router;
