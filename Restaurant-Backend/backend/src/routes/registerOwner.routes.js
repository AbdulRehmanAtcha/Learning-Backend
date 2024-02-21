import { Router } from "express";
import { RegisterOwnerHandler } from "../controllers/registerOwner.controller.js";
import { uploadImage } from "../middleware/multer.middleware.js";
const router = Router()

router.route("/register").post(uploadImage.fields([{ maxCount: 1, name: "avatar" }]), RegisterOwnerHandler)

export default router