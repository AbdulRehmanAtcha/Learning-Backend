import { Router } from "express"
import { 
    // ChangePassword, FetchProfile, LoginUser, LogoutUser, 
    RegisterEmployee
    //  TokenRefresher, UpdateProfile
 } from "../controllers/limitedEmployee.controllers.js"
import { uploadImage } from "../middleware/multer.middleware.js"
import { VerifyingUser } from "../middleware/auth.middleware.js"
const router = Router()


router.route("/register").post(
    uploadImage.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ])
    , RegisterEmployee)

// router.route("/login").post(LoginUser)


// router.route("/logout").post(VerifyingUser, LogoutUser)
// router.route("/refresh-token").post(TokenRefresher)
// router.route("/change-password").put(VerifyingUser, ChangePassword)
// router.route("/update-profile").put(VerifyingUser, uploadImage.fields([
//     {
//         name: "avatar",
//         maxCount: 1
//     }
// ]), UpdateProfile)

// router.route("/profile").get(VerifyingUser, FetchProfile)

export default router