import { Router } from "express"
import { RegisterEmployeeHandler } from "../controllers/employee.controller.js"
import { VerifyingUser } from "../middleware/auth.middleware.js"
const router = Router()

router.route("/register").post(VerifyingUser, RegisterEmployeeHandler)
export default router