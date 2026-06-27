const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send("Hello world");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on all interfaces");
});

