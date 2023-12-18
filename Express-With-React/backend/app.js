import express from "express";
const app = express();

app.get("/", (req,res)=>{
    res.send("Hello Buddy")
})

app.listen(3100, ()=>(
    console.log("Server Started")
))