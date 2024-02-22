import { EmployeeModel } from "../models/employee.model.js";
import { OwnerModel } from "../models/owner.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CloudinaryUploader } from "../utils/cloudinary.js";


export const GenerateTokens = async (id) => {
    try {
        const user = await OwnerModel.findById(id)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(401, "Something went wrong while generating token")
    }
}

export const RegisterOwnerHandler = asyncHandler(async (req, res) => {
    const { fullName, phone, email, password, restaurantName, role } = req.body
    if ([fullName, phone, email, password, restaurantName, role].some((item) => !item || item?.trim() === "")) {
        throw new ApiError(200, "All fields are required")
    }

    const localPath = req?.files?.avatar ? req?.files?.avatar[0]?.path : null
    if (!localPath) {
        throw new ApiError(400, "Avatar is required")
    }
    const uploadImage = await CloudinaryUploader(localPath, "Owners")

    const findOwner = await OwnerModel.find({ $or: [{ email }, { restaurantName }] })
    if (findOwner.length > 0) {
        throw new ApiError(409, "Email or restaurant already registered")
    }

    const toMatch = ["ceo", "c.e.o"]
    const roleMatch = toMatch.filter((item) => item === role.toLowerCase())
    if (roleMatch.length === 0) {
        throw new ApiError(401, "Unauthorized request")
    }

    const owner = { fullName, phone, email, password, restaurantName, role: "CEO", avatar: uploadImage?.url }
    const registerOwner = await OwnerModel.create(owner)
    const respond = await OwnerModel.findById(registerOwner._id).select("-password -refreshToken")

    return res.status(200).json(new ApiResponse(200, respond, "Data Received Successfully"))
})

export const LoginOwnerHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if ([email, password].some((item) => !item || item.trim() === "")) {
        throw new ApiError(200, "All fields are required")
    }
    const user = await OwnerModel.findOne({ email })
    if (!user) {
        throw new ApiError(401, "Invalid email or password")
    }
    const checkPassword = await user.isPasswordCorrect(password)
    if (!checkPassword) {
        throw new ApiError(401, "Invalid email or password")
    }
    const tokenOption = {
        httpOnly: true,
        secure: true
    }
    const response = await OwnerModel.findById(user._id).select("-password -refreshToken")
    const { accessToken, refreshToken } = await GenerateTokens(user._id)
    return res.status(200).cookie("accessToken", accessToken, tokenOption).cookie("refreshToken", refreshToken, tokenOption).json(new ApiResponse(200, response, "Login Successfull"))
})

