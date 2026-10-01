const users = require('../bd/users.json');

function getUsers(req, res){
  res.render('user', { users });
};

module.exports = {
  getUsers
};  