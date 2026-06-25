const express = require("express");
const Joi = require("joi");
const app = express();
require("dotenv").config();
app.use(express.json());

const courses = [
  { id: 1, title: "Course 1" },
  { id: 2, title: "Course 2" },
  { id: 30, title: "Course 3" },
];

app.get("/", function (req, res) {
  res.send("Hello world");
});

app.get("/api/courses", function (req, res) {
  //   let course = courses[req.query.id - 1];
  let course = courses.find((e) => e.id === parseInt(req.query.id));
  if (course) res.send(course);
  else res.send(courses);
});

app.get("/api/courses/:id", function (req, res) {
  //   let course = courses[req.params.id - 1];
  let course = courses.find((e) => e.id === parseInt(req.params.id));
  if (course) res.send(course);
  else res.status(404).send("");
});

app.post("/api/courses", function (req, res) {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    title: Joi.string().min(3).required(),
  });
  if (schema.validate(req.body).error) return res.status(400).send("");
  let course = courses.find((e) => e.id === parseInt(req.body.id));
  if (course) res.status(403).send("");
  else {
    const course = {
      id: req.body.id,
      title: req.body.title,
    };
    courses.push(course);
    res.status(201).send(course);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server listening on port ${port}...`);
});
