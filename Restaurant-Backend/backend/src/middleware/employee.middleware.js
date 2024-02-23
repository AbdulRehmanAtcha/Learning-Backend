import { StaffModel } from "../models/limitedEmployee.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const VerifyingEmployee = asyncHandler(async (req, res, next) => {
    try {
        const checkingToken = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer: ", "")
        if (!checkingToken) {
            throw new ApiError(401, "Unauthorized Request")
        }
        const decodedData = jwt.verify(checkingToken, process.env.ACCESS_TOKEN_SECRET)

        const user = await StaffModel.findById(decodedData._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Unauthorized Request")
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(400, error?.message || "Unauthorized Logout Request")
    }
})
