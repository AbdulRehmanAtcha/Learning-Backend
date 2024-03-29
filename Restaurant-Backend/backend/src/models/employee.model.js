import mongoose, { Schema } from "mongoose"

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: [true, "Employee name is required"],
        minLength: [3, "Employee name must contain 3 characters"],
        maxLength: [30, "Employee name's maxlength is 30 characters"]

    },
    role: {
        type: String,
        required: [true, "Employee role is required"],
        lowercase: true,
        minLength: [2, "Employee role must be of 2 characters"]
    },
    phone: {
        type: Number,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true,
    },
    salary: {
        type: Number,
        required: true,
        min: [1, "Salary can't be 0 or less"]
    },
    bankAccount: {
        type: Number,
        trim: true,
        required: [true, "Account number is required"]
    },
    avatar: {
        type: String,
        required: [true, "Avatar is required"]
    },
    email: {
        type: String,
        required: [true, "Employee Email is Required"],
        trim: true,
        lowercase: true
    },
    isRemoved: {
        type: Boolean,
        default: false
    },
    restaurantName: {
        required: [true, "Restaurant name is required"],
        type: String,
    },

}, {
    timestamps: true
})

export const EmployeeModel = mongoose.model("Employee", EmployeeSchema)