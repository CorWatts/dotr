var _           = require('lodash');
var jsonfile    = require('jsonfile');
var errors      = require('../lib/errors');
var helpers     = require('../lib/helpers');
var config      = require('../config/config');
var gi          = helpers.gi;

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

exports.sub = function(req, res, next) {
  id = parseInt(req.params.id);

  subcategories = _.find(db, {type: "subcategory", parent: id});
  if(subcategories === undefined)
    errors.does_not_exist(res, "category");

  res.send(200, {
    "status": "success",
    "data": subcategories
  });
}

exports.post = function(req, res, next) {
  value = req.body.value;

	id = helpers.get_new_id(db);

	existing_category = _.findWhere(db, {type: "category", value: value});
	if(existing_category !== undefined)
		errors.already_exists(res, "category");

  gi.search(value, {size: 'medium'})
    .then(function(images) {
      if (images.length === 0) {
        res.send(404, {error: "No images were found!"});
      } else {
        json = {
          "id": id,
          "parent": null,
          "type": "category",
          "value": value,
          "image_url": images[0].url
        }
        db.push(json);

        jsonfile.writeFileSync(file, db, {spaces: 2});

        // Send back the value they posted
        helpers.success(200, {
          "status": "success",
          "data": json
        });
      }
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

	gi.search(value, {size: 'medium'})
        .then(function(images) {
            if (images.length === 0) {
                res.send(404, {error: "No images were found!"});
            } else {
                db[arr_id].value = value;
                db[arr_id].image_url = images[0].url;

                jsonfile.writeFileSync(file, db, {spaces: 2});

                // Send back the value they posted
                res.send(200, {
                    "status": "success",
                    "data": db[arr_id]
                });
            }
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
