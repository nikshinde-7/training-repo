require('dotenv').config();

module.exports = {
  development: {
    username: `${process.env.DBUSER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`,
    host: `${process.env.HOST}`,
    port: `${process.env.DBPORT}`,
    dialect: 'postgres',
  },
};
