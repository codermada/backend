const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: ["http://localhost:5500"] }));

app.get("/", function (req, res) {
  res.send("Hello world!");
});

app.get("/message", function (req, res) {
  res.send({ message: "Hello from the backend" });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server listening on port ${port}...`);
});
