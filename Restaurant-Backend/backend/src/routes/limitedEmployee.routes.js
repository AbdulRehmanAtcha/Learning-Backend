import { Router } from "express"
import { LoginHandler, LogoutHandler, SignupHandler } from "../controllers/limitedEmployee.controllers.js"
import { VerifyingEmployee } from "../middleware/employee.middleware.js"

const router = Router()

router.route("/signup").post(SignupHandler)
router.route("/login").post(LoginHandler)
router.route("/logout").post(VerifyingEmployee, LogoutHandler)

export default router