import { PostModel } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CloudinaryUploader } from "../utils/cloudinary.js";

export const PostHandler = asyncHandler(async (req, res) => {
    const { postContent } = req.body
    if (!postContent) {
        throw new ApiError(400, "Post content is required")
    }
    const user = req.user
    // const file = req?.files?.postImage[0]?.path
    const file = req?.files?.postImage

    const uploadImage = file !== undefined ? await CloudinaryUploader(file[0]?.path) : null
    const post = {
        postContent,
        postImage: uploadImage?.url,
        ownerId: user?._id
    }
    await PostModel.create(post)
    return res.status(200).json(new ApiResponse(200, {}, "Your post has been posted"))
})

export const GetAllPostsHandler = asyncHandler(async (req, res) => {
    const posts = await PostModel.find({ isDeleted: false })
    if (!posts) {
        throw new ApiError(400, "Something went wrong in fetching products")
    }
    return res.status(200).json(new ApiResponse(200, posts, "All posts have been fetched"))

})

export const GetSinglePost = asyncHandler(async (req, res) => {
    const { id } = req?.params
    if (!id) {
        throw new ApiError(400, "Post id is missing")
    }
    const getPost = await PostModel.find({ $and: [{ _id: id }, { isDeleted: false }] })
    return res.status(200).json(new ApiResponse(200, getPost, "Got product successfully"))
})

export const GetPostsOfUser = asyncHandler(async (req, res) => {
    const { id } = req?.params
    const posts = await PostModel.find({ $and: [{ ownerId: id }, { isDeleted: false }] })
    return res.status(200).json(new ApiResponse(200, posts, "Got all posts of user"))
})

export const EditPostHandler = asyncHandler(async (req, res) => {
    const { postContent } = req.body
    if (!postContent) {
        throw new ApiError(400, "Post can not be empty")
    }
    const { id } = req.params
    const user = req.user
    // const post = await PostModel.findById(id)
    const post = await PostModel.find({ $and: [{ _id: id }, { isDeleted: false }] })
    console.log(post[0].ownerId, "POST")
    if (!post || post.length === 0) {
        throw new ApiError(400, "No post found")
    }
    if (!post[0].ownerId.equals(user._id)) {
        throw new ApiError(400, "You can't edit this post")
    }
    post[0].postContent = postContent
    await post[0].save({ validateBeforeSave: false })
    return res.status(200).json(new ApiResponse(200, post[0], "Post edited successfully"))
    // if (user._id !== id) {
    //     throw new ApiError(400, "Unautorized Request")
    // }
})

export const DeletePostHandler = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = req.user
    if (!id) {
        throw new ApiError(401, "Post id is required")
    }
    const post = await PostModel.findById(id)

    if (!post.ownerId.equals(user._id)) {
        throw new ApiError(402, "Unauthorized request")
    }
    if (post.isDeleted === true) {
        throw new ApiError(402, "Invalid request")
    }
    post.isDeleted = true
    await post.save({ validateBeforeSave: false })
    return res.status(200).json(new ApiResponse(200, {}, "Post deleted successfully"))
})

export const SearchPostHandler = asyncHandler(async (req, res) => {
    const { search } = req.body
    if (!search) {
        throw new ApiError(400, "Search term is required")
    }
    const posts = await PostModel.find({ $and: [{ postContent: { $regex: new RegExp(search, "i") } }, { isDeleted: false }] })
    return res.status(200).json(new ApiResponse(200, posts, "Got Searched Posts Successfully"));
})