var _        = require('lodash');
var jsonfile = require('jsonfile');
var errors   = require('../lib/errors');
var helpers  = require('../lib/helpers');
var config   = require('../config/config');
var gi          = helpers.gi;

var db   = config.db;
var file = config.file;

exports.list = function(req, res, next) {
  criteria = {};
  if(_.has(req.params, "parent_id"))
    criteria.parent =  parseInt(req.params.parent_id);

  if(_.has(req.params, "parent_name")) {
    parent_name =  req.params.parent_name;
    if(!_.has(criteria, "parent"))
      criteria.parent = helpers.get_id(db, "subcategory", parent_name);
  }

  criteria = _.merge(criteria, {type: "item"});

  items = _.where(db, criteria);

  res.send(200, {
    "status": "success",
    "parent_id": criteria.parent,
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
  subcategoryId = parseInt(req.params.subcategoryId);
  value = req.body.value;

  subcategory = _.findWhere(db, {type: "subcategory", id: subcategoryId});
  if(subcategory === undefined)
    errors.does_not_exist(res, "subcategory");

  id = helpers.get_new_id(db);

  existing_item = _.findWhere(db, {type: "item", value: value});
  if(existing_item !== undefined)
    errors.already_exists(res, "item");

  gi.search(value, {size: 'medium'})
    .then(function(images) {
      if(images.length !== 0)
        image_url = images[0].url;
      else
        image_url = "https://i.imgur.com/EJDyDie.jpg";

      json = {
        "id": id,
        "parent": subcategory.id,
        "type": "item",
        "value": value,
        "image_url": images[0].url
      }
      db.push(json);

      jsonfile.writeFileSync(file, db, {spaces: 2});

      // Send back the value they posted
      res.send(200, {
        "response": "success",
        "data": json
      });
    });
}

exports.put = function(req, res, next) {
  value = req.body.value;
  id = req.body.id;

  var arr_id = _.findIndex(db, function(item) {
    return item.id == id;
  });

  if(arr_id === undefined)
    errors.does_not_exist(res, "item");

  gi.search(value, {size: 'medium'})
    .then(function(images) {
      db[arr_id].value = value;
      db[arr_id].image_url = images[0].url;


      jsonfile.writeFileSync(file, db, {spaces: 2});

      // Send back the value they posted
      res.send(200, {
        "status": "success",
        "data": db[arr_id]
      });
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

