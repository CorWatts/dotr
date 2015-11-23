var _        = require('lodash');
var jsonfile = require('jsonfile');
var imagesearch = require('google-images');
var util     = require('util');
var errors   = require('../lib/errors');
var helpers  = require('../lib/helpers');
var config   = require('../config/config');

var db   = config.db;
var file = config.file;

exports.list = function(req, res, next) {
  criteria = {};
  if(_.has(req.params, "parent_id"))
    criteria.parent =  parseInt(req.params.parent_id);

  if(_.has(req.params, "parent_name")) {
    parent_name =  req.params.parent_name;
    if(!_.has(criteria, "parent"))
      criteria.parent = helpers.get_id(db, "category", parent_name);
  }

  criteria = _.merge(criteria, {type: "subcategory"});

  subcategories = _.where(db, criteria);

  res.send(200, {
    "status": "success",
    "parent_id": criteria.parent,
    "data": subcategories
  });
}

exports.get = function(req, res, next) {
  id = parseInt(req.params.id);

  subcategory = _.findWhere(db, {type: "subcategory", id: id});
  if(subcategory === undefined)
    errors.does_not_exist(res, "subcategory");

  res.send(200, {
    "status": "success",
    "data": subcategory
  });
}

exports.post = function(req, res, next) {
  categoryId = parseInt(req.params.categoryId);
  value = req.body.value;

  category = _.findWhere(db, {type: "category", id: categoryId});
  if(category === undefined)
    errors.does_not_exist(res, "category");

  id = helpers.get_new_id(db);

  existing_subcategory = _.findWhere(db, {type: "subcategory", value: value});
  if(existing_subcategory !== undefined)
    errors.already_exists(res, "subcategory");

  imagesearch.search(value, {size: "small", callback: function (err, images) {
    json = {
      "id": id,
      "parent": category.id,
      "type": "subcategory",
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
  }});
}

exports.put = function(req, res, next) {
  value = req.body.value;
  id = req.body.id;

  var arr_id = _.findIndex(db, function(subcategory) {
    return subcategory.id == id;
  });

  if(arr_id === undefined)
    errors.does_not_exist(res, "subcategory");

  imagesearch.search(value, {size: "small", callback: function (err, images) {
    db[arr_id].value = value;
    db[arr_id].image_url = images[0].url;


    jsonfile.writeFileSync(file, db, {spaces: 2});

    // Send back the value they posted
    res.send(200, {
      "status": "success",
      "data": db[arr_id]
    });
  }});
}

exports.destroy = function(req, res, next) {
  id = parseInt(req.params.id);

  index = _.findIndex(db, {type: "subcategory", id: id});

  if(index === -1)
      errors.does_not_exist(res, "subcategory");

  helpers.delete_id(res, db, file, id);

  // Send back the value they posted
  res.send(200, {
    "response": "success"
  });
};
