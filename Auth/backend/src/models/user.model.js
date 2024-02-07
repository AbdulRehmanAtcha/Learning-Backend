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
    username: {
      required: [true, "Username is required"],
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
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
    },
    avatar: {
      type: String,
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
  this.password = bcrypt.hash(this.password, 10)
  next()
})
userSchema.method.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}
userSchema.method.generateAccessToken = function () {
  jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName,
  })
}
userSchema.method.generateRefreshToken = function () { }

export const UserModel = mongoose.model("User", userSchema);
