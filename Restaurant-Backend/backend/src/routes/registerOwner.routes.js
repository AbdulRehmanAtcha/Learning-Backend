import { Router } from "express";
import { RegisterOwnerHandler } from "../controllers/registerOwner.controller.js";
const router = Router()

router.route("/register").post(RegisterOwnerHandler)

export default router