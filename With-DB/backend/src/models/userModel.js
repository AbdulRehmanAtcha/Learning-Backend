import mongoose from "mongoose";
import DBConnectionHandler from "../DB/database.js";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("Users", userSchema);

DBConnectionHandler();

export const RegisterUserHandler = async (user) => {
  try {
    const newUser = new userModel(user);
    await newUser.save();
    return "Saved";
  } catch (err) {
    console.log(err);
  }
};
