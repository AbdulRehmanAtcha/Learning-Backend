import { Router } from "express";
import { LoginOwnerHandler, RegisterOwnerHandler } from "../controllers/owner.controller.js";
import { uploadImage } from "../middleware/multer.middleware.js";
import { VerifyingUser } from "../middleware/auth.middleware.js";
const router = Router()

router.route("/register").post(uploadImage.fields([{ maxCount: 1, name: "avatar" }]), RegisterOwnerHandler)
router.route("/login").post(LoginOwnerHandler)

export default router