import express from "express";
import bodyParser from "body-parser";

export const adminRoutes = express.Router();

adminRoutes.use(bodyParser.json());
adminRoutes.use(bodyParser.urlencoded({ extended: true }));

export const registeredUsers = [
  {
    id: "4n5pxq24kriob12ogd",
    name: "Abdul Rehman",
    email: "abdul@gmail.com",
  },
  {
    id: "4n5pxq24ksiob12ogl",
    name: "Muhammad Yahya",
    email: "yahya@gmail.com",
  },
];

adminRoutes.post("/add-user", (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    registeredUsers.push(body);
    res.json({ message: "Data received successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



