import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { UserModel } from "../models/user.model.js";
import { CloudinaryUploader } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body
    if ([fullName, username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All Fields Are Required")
    }
    const emailExist = await UserModel.findOne({ email })

    const usernameExist = await UserModel.findOne({ username })

    if (emailExist) {
        throw new ApiError(409, "Email aalready registered")
    }

    if (usernameExist) {
        throw new ApiError(409, "Username already registered")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatarUpload = await CloudinaryUploader(avatarLocalPath)

    if (!avatarUpload) {
        throw new ApiError(400, "Avatar is required")
    }

    const registeringUser = await UserModel.create({
        email,
        fullName,
        username: username.toLowerCase(),
        avatar: avatarUpload?.url,
        password,
    })

    const checkingUserCreated = await UserModel.findById(registeringUser._id).select(
        "-password -refreshToken"
    )

    if (!checkingUserCreated) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, checkingUserCreated, "User Registered Successfully")
    )

})



export const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !password) {
        throw new ApiError(400, "All fields are required")
    }
    
})