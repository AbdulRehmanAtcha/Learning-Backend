import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"


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
    },
    restaurantName: {
        required: [true, "Restaurant name is required"],
        type: String,
    },
    role: {
        required: [true, "Role is required"],
        type: String,
        trim: true
    },

}, {
    timestamps: true
})

ownerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export const OwnerModel = mongoose.model("Owner", ownerSchema)