import mongoose, { Schema } from "mongoose"

const orderSchema = ({
    email: {
        required: [true, "Customer email is required"],
        trim: true,
        lowercase: true,
        type: String
    },
    name: {
        required: [true, "Customer name is required"],
        type: String,
    },
    address: {
        required: [true, "Customer address is required"],
        type: String
    },
    items: {
        type: Array,
        required: [true, "Order items are required"]
    },
    totalPrice: {
        type: Number,
        required: [true, "Total price is required"]
    },
    phone: {
        required: [true, "Customer number is required"]
    },
    orderStatus: {
        default: "pending",
        type: String
    },
}, {
    timestamps: true
})