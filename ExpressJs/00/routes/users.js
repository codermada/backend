const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' }
];

router.get('/', (req, res) => {
  res.send('Users route');
});

router.get('/new', (req, res) => {
  res.render('users/new', { title: 'New User' });
});

router.post('/', (req, res) => {
  const isValid = true; // Simulate validation
  if (isValid) {
    const newUser = {
      id: users.length + 1,
      name: req.body.name
    };
    users.push(newUser);
    res.redirect(`/users/${newUser.id}`);
  } else {
    console.log('Error creating user');
    res.render('users/new', { title: 'New User', error: 'Error creating user' });
  }
});

// router.get('/:id', (req, res) => {
//   res.send(`User ID: ${req.params.id}`);
// });

// router.put('/:id', (req, res) => {
//   res.send(`User ID: ${req.params.id}`);
// });

// router.delete('/:id', (req, res) => {
//   res.send(`User ID: ${req.params.id}`);
// });

router.route('/:id')
  .get((req, res) => {
    res.send(`User ID: ${req.user.id}, Name: ${req.user.name}`);
  })
  .put((req, res) => {
    res.send(`User ID: ${req.user.id}, Name: ${req.user.name}`);
  })
  .delete((req, res) => {
    res.send(`User ID: ${req.user.id}, Name: ${req.user.name}`);
  });



router.param('id', (req, res, next, id) => {
  const user = users.find(u => u.id === parseInt(id));
  if (!user) {
    return res.status(404).send('User not found');
  }
  req.user = user;
  next();
});

module.exports = router;