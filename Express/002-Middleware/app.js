const express = require("express");
const app = express();

app.use((req,res,next)=>{
  console.log("hello middle");
  next();
})
app.use((req,res,next)=>{
  console.log("hello 2nd middle")
  res.send('<h1>Hello Html from Express</h1>')
})

app.listen(3100, () => {
  console.log("Server Started");
});
