import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

const userSchema = new Schema(
  {
    fullname: {
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

export const UserModel = mongoose.model("User", userSchema);
