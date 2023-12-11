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
    <h1>Hello World!</h1>
    </body>
    </html>
    `);
    return res.end();
  } else if (url === "/about") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <html>
    <head>
    <title>Send Message</title>
    </head>
    <body>
    <h1>About us.</h1>
    </body>
    </html>
    `);
    return res.end();
  }
});
server.listen(3000);
