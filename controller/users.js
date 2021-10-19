const models = require('../database/models');

exports.createNewUser = async (data) => {
  const newUser = await models.User.create(data);
  return newUser;
};

exports.findAllUsers = async () => {
  const users = await models.User.findAll();
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
