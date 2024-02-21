import mongoose, { Schema } from "mongoose"

const ownerSchema = new Schema({
    fullName: {
        required: [true, "Owner name is required"],
        type: String,

    },
    phone: {
        required: [true, "Owner phone number is required"],
        type: Number,
        trim: true
    },
    email: {
        required: [true, "Owner email is required"],
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        required: [true, "Password is required"],
        type: String,
        trim: true
    }
})

export const OwnerModel = mongoose.model("Owner", ownerSchema)