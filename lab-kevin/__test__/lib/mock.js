'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');
const debug = require('debug')('http:mock');

const mock = module.exports = {};


mock.user = {
  username: `${faker.name.prefix()}${faker.hacker.adjective()}`.replace('.', ''),
  email: `${faker.internet.email()}`,
  password:`${faker.hacker.adjective()}${faker.hacker.noun()}${faker.hacker.verb()}`,
};

mock.createUser = () => {
  let userCreds = mock.user;
  let pswd = userCreds.password;
  let newUser = new Auth({username:userCreds.username, email:userCreds.email});
  return newUser.createHashedpassword(pswd)
    .then(() => newUser.save())
    .then(() => newUser.createToken())
    .then(jwt => res.status(201).json(jwt))
    .catch(console.err);
};

mock.removeUsers = () => Promise.all([Auth.remove()]); 



