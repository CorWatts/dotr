var _        = require('lodash');
var jsonfile = require('jsonfile');
var errors   = require('../lib/errors');
var helpers  = require('../lib/helpers');
var config   = require('../config/config');

var db   = config.db;
var file = config.file;

exports.list = function(req, res, next) {
  categories = _.where(db, {type: "category"});

  res.send(200, {
    "status": "success",
    "data": categories
  });
}

exports.get = function(req, res, next) {
  id = parseInt(req.params.id);

  category = _.findWhere(db, {type: "category", id: id});
  if(category === undefined)
    errors.does_not_exist(res, "category");

  res.send(200, {
    "status": "success",
    "data": category
  });
}

exports.post = function(req, res, next) {
  value = req.body.value;

  id = helpers.get_new_id(db);

  existing_category = _.findWhere(db, {type: "category", value: value});
  if(existing_category !== undefined)
    errors.already_exists(res, "category");

  json = {
    "id": id,
    "parent": null,
    "type": "category",
    "value": value
  }
  db.push(json);

  jsonfile.writeFileSync(file, db, {spaces: 2});

  // Send back the value they posted
  res.send(200, {
    "status": "success",
    "data": json
  });
}

exports.destroy = function(req, res, next) {
  id = parseInt(req.params.id);

  index = _.findIndex(db, {type: "category", id: id});

  if(index === -1)
      errors.does_not_exist(res, "category");

  helpers.delete_id(res, db, file, id);

  // Send back the value they posted
  res.send(200, {
    "response": "success"
  });
}
