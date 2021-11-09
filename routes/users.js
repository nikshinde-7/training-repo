import errorMessages from '../constants/errorMessages';
import successMessages from '../constants/successMessages';
import userList from '../data/UserData.json';
import { processJsonData } from '../helpers/JsonHelper';

const express = require('express');
const passport = require('passport');

const {
  createNewUser,
  findAllUsers,
  deleteUser,
  updateUser,
  findUser,
  createNewGoogleUser,
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
    res.status(500).send(e);
  }
});

// to get all users
router.get('/api/users/get-all', async (req, res) => {
  try {
    const users = findAllUsers();
    res.status(201).send(users);
  } catch (e) {
    console.log(e);
    res.status(500).send(errorMessages.SOMETHING_WENT_WRONG);
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
    res.status(500).send(errorMessages.SOMETHING_WENT_WRONG);
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
    res.status(201).send(successMessages.UPDATED_SUCCESS);
  } catch (e) {
    console.log(e);
    res.status(500).send(errorMessages.SOMETHING_WENT_WRONG);
  }
});

// to render templates
router.get('/api/template/:id', async (req, res) => {
  const user = await findUser(req.params.id);
  console.warn({ user });
  res.render('UserInfo', {
    name: user.dataValues.name,
    email: user.dataValues.email,
  });
});

// to render templates with partials
router.get('/api/template', async (req, res) => {
  const user = await findAllUsers();
  console.warn({ user: user[1].dataValues });
  res.render('Home', { user });
});

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/api/callback', async (req, res, next) => {
  await passport.authenticate(
    'google',
    { scope: ['profile', 'email'], failureRedirect: '/login' },
    async (err, user, info) => {
      try {
        if (user) {
          const newUser = await createNewGoogleUser(user);
          req.logIn(newUser, (error) => {
            if (error) {
              console.log('error ====== >>> ', error);
              next(error);
            }
          });
          return res.redirect('/user');
        }
        return res.redirect('/error');
      } catch (e) {
        console.log(e);
        return res.redirect('/');
      }
    }
  )(req, res, next);
});

router.get('/user', async (req, res) => {
  try {
    console.log('Inside User endpoint !! ', { req: req.session });
    if (req.session.passport.user) {
      res.json({ data: req.session.passport.user });
    } else {
      res.send(errorMessages.UNAUTHORIZED_USER);
    }
  } catch (e) {
    res.status(500).send(errorMessages.SOMETHING_WENT_WRONG);
  }
});

router.post('/api/insert-dummy', async (req, res) => {
  try {
    const { message } = await processJsonData(req.body);
    res.send(message);
  } catch (error) {
    console.log(error);
    res.status(500).send(errorMessages.SOMETHING_WENT_WRONG);
  }
});

router.get('/api/getAllUsers', async (req, res) => {
  res.render('ListUsers', { userList });
});

module.exports = router;
