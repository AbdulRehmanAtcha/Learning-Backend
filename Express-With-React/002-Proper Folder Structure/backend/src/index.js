import express from "express";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config({ path: "./env" });

app.listen(port, () => {
  console.log("Hello");
});
