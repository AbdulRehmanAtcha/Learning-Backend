import { Router } from "express";
import { GetEmployeesHandler, LoginOwnerHandler, RegisterOwnerHandler } from "../controllers/owner.controller.js";
import { uploadImage } from "../middleware/multer.middleware.js";
import { VerifyingUser } from "../middleware/auth.middleware.js";
const router = Router()

router.route("/register").post(uploadImage.fields([{ maxCount: 1, name: "avatar" }]), RegisterOwnerHandler)
router.route("/login").post(LoginOwnerHandler)
router.route("/employees").get(VerifyingUser, GetEmployeesHandler)

export default router