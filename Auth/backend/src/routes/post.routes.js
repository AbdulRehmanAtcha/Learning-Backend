import { Router } from "express"
import { PostHandler } from "../controllers/posts.controller.js"
import { VerifyingUser } from "../middleware/auth.middleware.js"
import { uploadImage } from "../middleware/multer.middleware.js"
const router = Router()

router.route("/post").post(VerifyingUser, uploadImage.fields([
    {
        name: "postImage",
        maxCount: 1
    }
]), PostHandler)

export default router