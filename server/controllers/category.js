var _        = require('lodash');
var jsonfile = require('jsonfile');
var errors   = require('../lib/errors');
var helpers  = require('../lib/helpers');
var config   = require('../config/config');

var db   = config.db;
var file = config.file;

exports.list = function(req, res, next) {
  criteria = {};
  if(_.has(req.params, "id"))
    criteria.id =  parseInt(req.params.id);

  if(_.has(req.params, "value"))
    criteria.value = req.params.value;

  criteria = _.merge(criteria, {type: "category"});
  categories = _.where(db, criteria);

  res.send(200, {
    "status": "success",
    "data": categories
  });
  res.next();
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
  res.next();
}

exports.sub = function(req, res, next) {
  id = parseInt(req.params.id);

  subcategories = _.find(db, {type: "subcategory", parent: id});
  if(subcategories === undefined)
    errors.does_not_exist(res, "category");

  res.send(200, {
    "status": "success",
    "data": subcategories
  });
  res.next();
}

exports.post = function(req, res, next) {
  value = req.body.value;

	id = helpers.get_new_id(db);

	existing_category = _.findWhere(db, {type: "category", value: value});
	if(existing_category !== undefined)
		errors.already_exists(res, "category");

  helpers.gi_search(value)
    .then(function(image_url) {

      json = {
        "id": id,
        "parent": null,
        "type": "category",
        "value": value,
        "image_url": image_url
      }
      db.push(json);

      jsonfile.writeFileSync(file, db, {spaces: 2});

      // Send back the value they posted
      res.send(200, {
        "status": "success",
        "status": "success",
        "data": json
      });
      res.next();
    });
}

exports.put = function(req, res, next) {
  value = req.body.value;
  id = req.body.id;

  var arr_id = _.findIndex(db, function(category) {
    return category.id == id;
  });

  if(arr_id === undefined)
    errors.does_not_exist(res, "category");

	helpers.gi_search(value)
    .then(function(image_url) {
      db[arr_id].value = value;
      db[arr_id].image_url = image_url;

      jsonfile.writeFileSync(file, db, {spaces: 2});

      // Send back the value they posted
      res.send(200, {
          "status": "success",
          "data": db[arr_id]
      });
      res.next();
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
  res.next();
}
