const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <html>
    <head>
    <title>Send Message</title>
    </head>
    <body>
    <form action="/message" method="POST">
    <input type="text" name="Message"/>
    <button type="submit">Send</button>
    </form
    </body>
    </html>
    `);
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedData = Buffer.concat(body).toString();
      const message = parsedData.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    // fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  // console.log(req);
  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
    <head>
    <title>First page</title>
    </head>
    <body>
    <h1> Hello From Node Js. </h1>
    </body>
    </html>
    `);
  res.end();
});
server.listen(3000);
