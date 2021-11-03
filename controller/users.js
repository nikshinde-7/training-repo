/* eslint-disable no-underscore-dangle */
const uuid = require('uuid');
const models = require('../database/models');

exports.createNewUser = async (data) => {
  const newUser = await models.User.create(data);
  return newUser;
};

exports.createNewGoogleUser = async (userData) => {
  const userEmail = userData.profile.email
  || userData.profile._raw.email
  || userData.profile._json.email;

  console.log(models.User, models.Users);
  const existingUser = await models.User.findOne({
    where: { email: userEmail },
  });

  if (existingUser) {
    const data = {
      email: userEmail,
      name: userData.profile._json.name || userEmail,
    };
    // await models.User.update(data, {
    //   where: { email: userEmail },
    // });
    console.log('Hey returning!');
    return existingUser;
  }
  // if user doesn't exist we will create one
  const data = {
    email: userEmail,
    name: userData.profile._json.name || userEmail,
  };
  const newUser = await models.User.create(data);
  return newUser;
};

exports.findAllUsers = async () => {
  const users = await models.User.findAll();
  return users;
};

exports.findUser = async (id) => {
  const users = await models.User.findOne({ where: { id } });
  return users;
};

exports.deleteUser = async (userEmail) => {
  const users = await models.User.destroy({
    where: {
      email: userEmail,
    },
  });
  return users;
};

exports.updateUser = async (userEmail, data) => {
  await models.User.update(data, {
    where: { email: userEmail },
  });
};

exports.printSomething = () => 'hello';
