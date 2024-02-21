import { EmployeeModel } from "../models/employee.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const RegisterEmployeeHandler = asyncHandler(async (req, res) => {
    const { name, role, phone, salary, bankAccount, email } = req.body
    if ([name, role, phone, salary, bankAccount, email].some((item) => !item || item.trim() === "")) {
        throw new ApiError(401, "All fields are required")
    }
    if (!req.user || req.user.role !== "CEO") {
        throw new ApiError(401, "Unauthorized request");
    }
    const findEmployee = await EmployeeModel.findOne({ $or: [{ email }, { phone }, { bankAccount }] })
    if (findEmployee) {
        throw new ApiError(403, "Credentials already registered")
    }
    const user = { name, role, phone, salary, bankAccount, email }
    await EmployeeModel.create(user)
    return res.status(200).json(new ApiResponse(200, {}, "Hello"))
})