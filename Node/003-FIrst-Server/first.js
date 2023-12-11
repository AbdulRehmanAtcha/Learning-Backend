const http = require("http");

const server = http.createServer((req,res)=>{
    // console.log(req);
    res.setHeader("Content-Type","text/html")
    res.write(`
    <html>
    <head>
    <title>First page</title>
    </head>
    <body>
    <h1> Hello From Node Js. </h1>
    </body>
    </html>
    `)
    res.end();
})
server.listen(3000);