import dotenv from "dotenv";
import DBConnectionHandler from "./DB/database.js";
import { app } from "./app.js";

// const port = process.env.PORT || 3000;

dotenv.config({ path: "./env" });

DBConnectionHandler()
.then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log("Server Started At:", process.env.PORT)
  })
})
.catch((err)=>{
  console.log("DB Connection Error:", err)
})

// app.listen(port, () => {
//   console.log("Hello", port);
// });
