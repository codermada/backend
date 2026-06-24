const express = require('express')
const app = express()

app.use(logger)

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/login', auth, (req, res) => {
  res.send('Login Page');
})

app.get('/about', (req, res) => {
  res.send('About Page');
})

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

function auth(req, res, next) {
  console.log('Authenticating...');
  next();
}

app.listen(3000)