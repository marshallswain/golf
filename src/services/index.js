const users = require('./users/users.service.js');
const golfClubs = require('./golf-clubs/golf-clubs.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(golfClubs);
};
