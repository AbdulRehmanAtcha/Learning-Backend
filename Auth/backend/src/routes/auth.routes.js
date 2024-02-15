import { Router } from "express"
import { LoginUser, LogoutUser, RegisterUser } from "../controllers/users.controllers.js"
import { uploadImage } from "../middleware/multer.middleware.js"
import { VerifyingUser } from "../middleware/auth.middleware.js"
const router = Router()

router.route("/login").post(LoginUser)

router.route("/register").post(
    uploadImage.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ])
    , RegisterUser)



router.route("/logout").post(VerifyingUser, LogoutUser)

export default router