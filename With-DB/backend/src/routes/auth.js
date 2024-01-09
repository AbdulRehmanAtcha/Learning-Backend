import express from "express";
import { AddUserController } from "../controllers/userController.js";
const router = express.Router();

router.post("/register-user", AddUserController);

export default router;
