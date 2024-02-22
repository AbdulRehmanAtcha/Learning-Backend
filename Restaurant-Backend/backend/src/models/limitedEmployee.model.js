import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    fullName: {
      required: [true, "FullName is required"],
      type: String,
      index: true,
    },
    email: {
      required: [true, "Email is required"],
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      required: [true, "Password is required"],
      type: String,
      minLength: [3, "Password must be atleast 3 characters"]
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Employee role is required"],
      lowercase: true,
      minLength: [2, "Employee role must be of 2 characters"]
    },
    avatar: {
      type: String,
      required: [true, "Avatar is required"]
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
      role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const StaffModel = mongoose.model("Staff", userSchema);
