import { ProductModel } from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const PostHandler = asyncHandler(async (req, res) => {
    // const { postContent } = req.body
    const file = req?.files?.postImage[0]?.filename
    console.log(file)
    return res.status(200).json(new ApiResponse(200, {}, "Hello"))
})