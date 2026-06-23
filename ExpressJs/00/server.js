const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' , name: req.query.name || 'Guest'});
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);


function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});