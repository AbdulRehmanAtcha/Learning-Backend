import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


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
    avatar: {
        type: String,
        required: [true, "Profile image is required"]
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
    refreshToken: {
        type: String,
    },

}, {
    timestamps: true
})

ownerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

ownerSchema.methods.generateRefreshToken = function () {
    return (
        jwt.sign({

            _id: this._id

        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        })
    )
}

ownerSchema.methods.generateAccessToken = function () {
    return (
        jwt.sign(
            {
                name: this.fullName,
                email: this.email,
                _id: this._id,
                restaurantName: this.restaurantName,
                role: this.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    )
}

export const OwnerModel = mongoose.model("Owner", ownerSchema)