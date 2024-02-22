import { Router } from "express"
import { SignupHandler } from "../controllers/limitedEmployee.controllers.js"

const router = Router()

router.route("/signup").post(SignupHandler)

export default router