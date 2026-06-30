const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');

app.use(express.static('./public'))
app.use(morgan('dev'));


app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, "./index.html"));
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on all interfaces");
});

