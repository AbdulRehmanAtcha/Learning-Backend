const express = require("express");
const app = express();

app.get("/", (req,res)=>{
    res.send("Hello From Express");
})

app.listen(3100, () => {
  console.log("Server Started");
});
