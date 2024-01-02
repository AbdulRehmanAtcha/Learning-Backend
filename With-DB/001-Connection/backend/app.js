import express from "express";
import userRoutes from "./routes/user.js";
import { adminRoutes } from "./routes/admin.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    credentials: true,
  })
);

app.use("/admin", adminRoutes);
app.use("/api/v1", userRoutes);

app.listen(3100, () => console.log("Server Started"));
