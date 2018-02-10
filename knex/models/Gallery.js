const bookshelf = require("./bookshelf");

class Gallery extends bookshelf.Model {
  get tableName() {
    return "gallery";
  }
  get hasTimestamps() {
    return true;
  }
}

module.exports = Gallery;

//                  GALLERY
//      -----------------------------------
//      | ID  | AUTHOR | LINK | DESCRIPTION |
//      | NUM | STR    | STR  | STR         |
