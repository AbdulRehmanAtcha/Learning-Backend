import { RegisterUserHandler } from "../models/userModel.js";

const AddUserController = async (req, res) => {
  const body = req.body;
  try {
    const result = await RegisterUserHandler(body);
    if (result === "Saved") {
      res.status(200).json({ message: "User Saved Successfully" });
    } else {
      res.status(201).json({ message: "User Not Saved" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};
export { AddUserController };
