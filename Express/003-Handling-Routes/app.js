const express = require("express");
const app = express();

app.use("/about-us", (req , res , next)=>{
    res.send("Hello About")
})

app.use("/contact", (req , res , next)=>{
    res.send("Hello Contact")
})
app.use("/", (req , res , next)=>{
    res.send("Hello Home")
})

app.listen(3100, () => {
  console.log("Server Started");
});