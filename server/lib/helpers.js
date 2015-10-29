// just for testing: https://jsfiddle.net/5xd1y3e8/
var _        = require('lodash');
var errors   = require('../lib/errors');
var jsonfile = require('jsonfile');

var get_new_id = function(db) {
  max = _.max(db, "id");
  this_id = max.id;
  new_id = this_id + 1;
  return new_id;
}

var delete_id = function(res, db, file, id) {
  index = _.findIndex(db, {id: id});

  db.splice(index, 1);
   

  jsonfile.writeFileSync(file, db, {spaces: 2});

  delete_from_id(db, file, id);
};

var delete_from_id = function(db, file, id) {
  children = _.where(db, {parent: id});

  if(children.length === 0)
    return;


  _.map(children, function(item) {
    this_index = _.findIndex(db, {id: item.id});
    db.splice(this_index, 1);

   jsonfile.writeFileSync(file, db, {spaces: 2});

    return delete_from_id(db, file, item.id);
  });
};

module.exports = {
  get_new_id: get_new_id,
  delete_id: delete_id,
  delete_from_id: delete_from_id
}