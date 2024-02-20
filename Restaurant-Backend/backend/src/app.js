import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser"
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173/"],
    credentials: true,
  })
);

app.use(express.json({}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser())
app.use(bodyParser.json());


// app.post("/api/v1/auth/login",(req,res)=>{
//   console.log(req?.body)
//   res.status(200).json({message:"Hello"})
// })

// Importing Routes
import authRouter from "./routes/auth.routes.js";
app.use("/api/v1/auth", authRouter)

export { app };
