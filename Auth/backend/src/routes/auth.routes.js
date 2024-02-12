import { Router } from "express"
import { registerUser } from "../controllers/users.controllers.js"
import { uploadImage } from "../middleware/multer.middleware.js"
const router = Router()

router.route("/register").post(
    uploadImage.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ])
    , registerUser)

export default router