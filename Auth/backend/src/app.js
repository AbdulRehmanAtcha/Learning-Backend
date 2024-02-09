import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173/"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser())


// Importing Routes
import authRouter from "./routes/auth.routes.js";
app.use("/api/v1/auth", authRouter)

export { app };
