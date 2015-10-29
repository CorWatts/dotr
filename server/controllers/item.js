var _        = require('lodash');
var jsonfile = require('jsonfile');
var util     = require('util');
var errors   = require('../lib/errors');
var helpers  = require('../lib/helpers');
var config   = require('../config/config');

var db   = config.db;
var file = config.file;

exports.list = function(req, res, next) {
  items = _.where(db, {type: "item"});

  res.send(200, {
    "status": "success",
    "data": items
  });
}

exports.get = function(req, res, next) {
  id = parseInt(req.params.id);

  item = _.findWhere(db, {type: "item", id: id});
  if(item === undefined)
    errors.does_not_exist(res, "item");

  res.send(200, {
    "status": "success",
    "data": item
  });
}


exports.post = function(req, res, next) {
  subcategory = req.params.subcategory;
  name = req.body.name;
  desc = req.body.desc;

  subcategory = _.findWhere(db, {type: "subcategory", value: subcategory});
  if(subcategory === undefined)
    errors.does_not_exist(res, "subcategory");

  id = helpers.get_new_id(db);

  //existing_item = _.findWhere(db, {type: "item", value: value});
  existing_item = _.find(db, function(item) {
    if(item.type === "item" &&item.value.name === name)
      return true;
  });

  if(existing_item !== undefined)
    errors.already_exists(res, "item");


  json = {
    "id": id,
    "parent": subcategory.id,
    "type": "item",
    "value": {
      "name": name,
      "desc": desc
    }
  }
  db.push(json);

  jsonfile.writeFileSync(file, db, {spaces: 2});

  // Send back the value they posted
  res.send(200, {
    "response": "success",
    "data": json
  });
}

exports.destroy = function(req, res, next) {
  id = parseInt(req.params.id);

  index = _.findIndex(db, {type: "item", id: id});

  if(index === -1)
      errors.does_not_exist(res, "item");

  helpers.delete_id(res, db, file, id);

  // Send back the value they posted
  res.send(200, {
    "response": "success"
  });
};
