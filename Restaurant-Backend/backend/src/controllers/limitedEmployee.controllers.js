import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { StaffModel } from "../models/limitedEmployee.model.js";
import { CloudinaryUploader } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { EmployeeModel } from "../models/employee.model.js";


export const GenerateTokens = async (id) => {
    try {
        const findUser = await StaffModel.findById(id)
        const accessToken = findUser.generateAccessToken()
        const refreshToken = findUser.generateRefreshToken()

        findUser.refreshToken = refreshToken
        await findUser.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating token")
    }
}

export const SignupHandler = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body
    if ([fullName, email, password].some((item) => !item || item.trim() === "")) {
        throw new ApiError(401, "All fields are required")
    }

    const matchEmail = await EmployeeModel.findOne({ email }).select("phone role avatar")
    if (!matchEmail) {
        throw new ApiError(401, "Unauthorized request")
    }

    const checkEmail = await EmployeeModel.findOne({ email })
    if (checkEmail) {
        throw new ApiError(402, "Email already registered")
    }

    const employee = { fullName, email, password, phone: matchEmail.phone, role: matchEmail.role, avatar: matchEmail.avatar }
    await StaffModel.create(employee)
    console.log(matchEmail)
    return res.status(200).json(new ApiResponse(200, {}, "Employee Signup successfull"))
})