import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const RegisterOwnerHandler = asyncHandler(async (req, res) => {
    console.log(req.body)
    res.status(200).json(new ApiResponse(200, {}, "Data Received Successfully"))
})