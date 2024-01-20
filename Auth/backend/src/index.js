import dotenv from "dotenv";
import express from "express";
import DBConnectionHandler from "./DB/database.js";

const port = process.env.PORT || 3000;

dotenv.config({ path: "./env" });
const app = express();

DBConnectionHandler();

app.listen(port, () => {
  console.log("Hello", port);
});
