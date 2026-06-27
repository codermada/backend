const http = require('http');
const server = http.createServer(function(req, res){
    if (req.url === '/')
    {
        res.end("<html lang=\"en\"><head><link rel=\"stylesheet\" href=\"style.css\"></head><body></body></html>");
    }
    if (req.url === '/style.css')
    {
        res.end("body{background-color: black;}");
    }
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on all interfaces");
});