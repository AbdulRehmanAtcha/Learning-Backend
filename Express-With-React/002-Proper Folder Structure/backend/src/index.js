import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { adminRoutes } from "../src/routes/admin.js";
import userRoutes from "../src/routes/user.js";


const app = express();
dotenv.config({ path: "./env" });

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    credentials: true,
  })
);

app.use("/admin", adminRoutes);
app.use("/api/v1", userRoutes);


app.listen(port, () => {
  console.log("Hello",port);
});