import { Router } from "express"
import { DeletePostHandler, EditPostHandler, GetAllPostsHandler, GetPostsOfUser, GetSinglePost, PostHandler, SearchPostHandler } from "../controllers/posts.controller.js"
import { VerifyingUser } from "../middleware/auth.middleware.js"
import { uploadImage } from "../middleware/multer.middleware.js"
const router = Router()

router.route("/post").post(VerifyingUser, uploadImage.fields([
    {
        name: "postImage",
        maxCount: 1
    }
]), PostHandler)

router.route("/all-posts").get(VerifyingUser, GetAllPostsHandler)
router.route("/post/search").get(VerifyingUser, SearchPostHandler)
router.route("/post/:id").get(VerifyingUser, GetSinglePost)
router.route("/user/:id").get(VerifyingUser, GetPostsOfUser)
router.route("/edit/:id").put(VerifyingUser, EditPostHandler)
router.route("/delete/:id").delete(VerifyingUser, DeletePostHandler)

export default router