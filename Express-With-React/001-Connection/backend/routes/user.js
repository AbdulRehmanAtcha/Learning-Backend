import express from "express";
import { registeredUsers } from "./admin.js";

const router = express.Router();

router.get("/all-users", (req, res) => {
  res.send(registeredUsers);
});



export default router;
