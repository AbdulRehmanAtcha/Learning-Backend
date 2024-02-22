import { Router } from "express"
import { RegisterEmployeeHandler, RemoveEmployeeHandler } from "../controllers/employee.controller.js"
import { VerifyingUser } from "../middleware/auth.middleware.js"
import { uploadImage } from "../middleware/multer.middleware.js"
const router = Router()

router.route("/register").post(VerifyingUser, uploadImage.fields([{ maxCount: 1, name: "avatar" }]), RegisterEmployeeHandler)

router.route("/remove/:id").delete(VerifyingUser,RemoveEmployeeHandler)
export default router