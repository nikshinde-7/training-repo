const express = require('express');
const {
  createNewUser, findAllUsers, deleteUser, updateUser,
} = require('../controller/users');

const router = express.Router();

// todo-add try-catch in here
// to create new user
router.post('/api/users/create', async (req, res) => {
  try {
    const newUser = createNewUser(req.body);
    res.status(201).send(newUser);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

// to get all users
router.get('/api/users/get-all', async (req, res) => {
  try {
    const users = findAllUsers();
    res.status(201).send(users);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// to delete a user
router.post('/api/users/delete', async (req, res) => {
  try {
    console.log(req.query);
    const users = deleteUser(req.query.email);
    console.log({ users });
    res.status(201).send({ users });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// to update a user
router.post('/api/users/update', async (req, res) => {
  try {
    const data = {
      name: req.body.name,
    };
    console.log(req.body);
    updateUser(req.body.email, data);
    res.status(201).send('Success');
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
