const express = require('express')
const app = express()

const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

const bcrypt = require('bcrypt')

const posts = [
  {
    username: 'john_doe',
    title: 'Post 1'
  },
  {
    username: 'jane_doe',
    title: 'Post 2'
  }
]

const users = [];
let refreshTokens = [];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { username: req.body.username, email: req.body.email, password: hashedPassword };
    users.push(user);
    res.status(201).send('User registered successfully!');

  }
  catch {
    res.status(500).send('Error occurred while registering user.');
  }
});

app.get('/users', (req, res) => {
  res.json(users);
});


app.post('/login', async (req, res) => {
  const user = users.find(user => user.username === req.body.username);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_LIFE});
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      res.json({ accessToken : accessToken , refreshToken: refreshToken});
    } else {
      res.send('Not Allowed');
    }
  } catch {
    res.status(500).send('Error occurred while logging in.');
  }
});

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.status(401).send();
  if (!refreshTokens.includes(refreshToken)) return res.status(403).send();
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({username: user.username, email: user.email, password: user.password}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_LIFE});
    return res.json({accessToken : accessToken});
  });
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  res.status(204).send();
})

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.username));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});