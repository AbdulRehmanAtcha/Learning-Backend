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

// Importing Routes
import RegisterOwnerRoutes from "./routes/registerOwner.routes.js"
import EmployeeRoutes from "./routes/employee.routes.js"
app.use("/api/v1/owner", RegisterOwnerRoutes)
app.use("/api/v1/employee", EmployeeRoutes)

export { app };
