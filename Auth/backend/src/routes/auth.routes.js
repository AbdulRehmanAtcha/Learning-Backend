import { Router } from "express"
import { ChangePassword, LoginUser, LogoutUser, RegisterUser, TokenRefresher, UpdateProfile } from "../controllers/users.controllers.js"
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
router.route("/refresh-token").post(TokenRefresher)
router.route("/change-password").post(VerifyingUser, ChangePassword)
router.route("/update-profile").post(VerifyingUser, uploadImage.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]), UpdateProfile)

export default router