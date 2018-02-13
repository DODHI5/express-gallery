const bookshelf = require("./bookshelf");
const Gallery = require("./Gallery");
// const User = bookshelf.Model.extend({
//   tableName: 'users'
// });

class User extends bookshelf.Model {
  get tableName() {
    return "users";
  }
  get hasTimestamps() {
    return true;
  }
}

module.exports = User;
