import { OwnerModel } from "../models/owner.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const RegisterOwnerHandler = asyncHandler(async (req, res) => {
    // TODO: Get Data from frontend
    // TODO: Check if email or restaurant name is already there or not
    // TODO: If email or restaurant present return
    // TODO: Check for the role is ceo or not
    // TODO: If not then register that owner
    const { fullName, phone, email, password, restaurantName, role } = req.body
    if ([fullName, phone, email, password, restaurantName, role].some((item) => !item || item?.trim() === "")) {
        throw new ApiError(200, "All fields are required")
    }
    const toMatch = ["ceo", "c.e.o"]
    const findOwner = await OwnerModel.find({ $or: [{ email }, { restaurantName }] })
    if (findOwner.length > 0) {
        throw new ApiError(409, "Email or restaurant already registered")
    }
    const roleMatch = toMatch.filter((item) => item === role.toLowerCase())

    if (roleMatch.length === 0) {
        throw new ApiError(401, "Unauthorized request")

    }
    const owner = { fullName, phone, email, password, restaurantName, role: "CEO" }
    const registerOwner = await OwnerModel.create(owner)

    return res.status(200).json(new ApiResponse(200, registerOwner, "Data Received Successfully"))
})