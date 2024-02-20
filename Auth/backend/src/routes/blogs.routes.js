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

router.route("/all-blogs").get(VerifyingUser, GetAllPostsHandler)
router.route("/search").get(VerifyingUser, SearchPostHandler)
// TODO: Change route (also in postman) to something else of below route
router.route("/:id").get(VerifyingUser, GetSinglePost)
router.route("/user/:id").get(VerifyingUser, GetPostsOfUser)
router.route("/edit/:id").put(VerifyingUser, EditPostHandler)
router.route("/delete/:id").delete(VerifyingUser, DeletePostHandler)

export default router