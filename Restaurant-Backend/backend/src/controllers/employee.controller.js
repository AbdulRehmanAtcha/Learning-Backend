import { EmployeeModel } from "../models/employee.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { CloudinaryUploader } from "../utils/cloudinary.js"

export const RegisterEmployeeHandler = asyncHandler(async (req, res) => {
    const { name, role, phone, salary, bankAccount, email } = req.body
    if ([name, role, phone, salary, bankAccount, email].some((item) => !item || item.trim() === "")) {
        throw new ApiError(401, "All fields are required")
    }
    if (!req.user || req.user.role !== "CEO") {
        throw new ApiError(401, "Unauthorized request");
    }

    const file = req?.files?.avatar ? req?.files?.avatar[0].path : null
    if (!file) {
        throw new ApiError(401, "Avatar is required")
    }
    const uploadImage = await CloudinaryUploader(file, "Employees")


    const findEmployee = await EmployeeModel.findOne({ $or: [{ email }, { phone }, { bankAccount }] })
    if (findEmployee) {
        throw new ApiError(403, "Credentials already registered")
    }
    const user = { name, role, phone, salary, bankAccount, email, avatar: uploadImage?.url }
    await EmployeeModel.create(user)
    return res.status(200).json(new ApiResponse(200, {}, "Employee Registered Successfully"))
})

export const RemoveEmployeeHandler = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = req.user
    console.log(user, "USER")
    if (user?.role !== "CEO") {
        throw new ApiError(401, "Unauthorized request")
    }
    if (!id) { throw new ApiError(401, "Employee id is required") }
    const employee = await EmployeeModel.findById(id)
    if (!employee) {
        throw new ApiError(404, "No user found")
    }
    employee.isRemoved = !employee.isRemoved
    await employee.save({ validateBeforeSave: false })
    console.log(employee.isRemoved)
    return res.status(200).json(new ApiResponse(200, {}, `Employee ${employee.isRemoved ? "Deleted" : "Restored"} Successfully`))
})