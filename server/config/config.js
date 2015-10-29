var jsonfile = require('jsonfile');
var file = './db.json';

var db = jsonfile.readFileSync(file);

module.exports = {
  file: file,
  db: db
}