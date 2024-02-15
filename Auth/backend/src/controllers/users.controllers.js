import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { UserModel } from "../models/user.model.js";
import { CloudinaryUploader } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const GenerateTokens = async (id) => {
    try {
        const findUser = await UserModel.findById(id)
        const accessToken = findUser.generateAccessToken()
        const refreshToken = findUser.generateRefreshToken()

        findUser.refreshToken = refreshToken
        await findUser.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating token")
    }
}

export const RegisterUser = asyncHandler(async (req, res) => {
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

export const LoginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if ((!username && !email) || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const checkingUser = await UserModel.findOne({ $or: [{ username }, { email }] })

    if (!checkingUser) {
        throw new ApiError(404, "User not exist")
    }

    const passwordMatching = await checkingUser.isPasswordCorrect(password)

    if (!passwordMatching) {
        throw new ApiError(404, "User not exist")

    }

    const { accessToken, refreshToken } = await GenerateTokens(checkingUser._id)

    const loggedInUser = await UserModel.findById(checkingUser._id).select("-password -refreshToken")

    const tokenOptions = {
        httpOnly: true,
        secure: true
    }

    return res.status(201).cookie("accessToken", accessToken, tokenOptions).cookie("refreshToken", refreshToken, tokenOptions).json(new ApiResponse(200, { data: loggedInUser, refreshToken, accessToken }, "Login Successfull"))

})

export const LogoutUser = asyncHandler(async (req, res) => {
    await UserModel.findByIdAndUpdate(req.user, { $set: { refreshToken: undefined } }, { new: true })
    const tokenOptions = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("accessToken", tokenOptions).clearCookie("refreshToken",tokenOptions).json(200,{},"User Logout Successful")
})