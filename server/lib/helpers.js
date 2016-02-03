// just for testing: https://jsfiddle.net/5xd1y3e8/
var _        = require('lodash');
var jsonfile = require('jsonfile');
var bluebird = require('bluebird');
var googleImages = require('google-images');
var gi = googleImages(process.env.CES_ID, process.env.API_KEY);

var get_id = function(db, level, value) {
  obj = _.findWhere(db, {type: level, value: value});
  return obj.id;
}

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

var gi_search = function(term) {
  var search_options = {
    size: 'medium'
  };

  return gi.search(term, search_options)
    .then(function(images) {
      var image_url = "https://i.imgur.com/EJDyDie.jpg";
      if(images.length !== 0) {
        image_url = images[0].url;
      }
      return image_url;
    });
};

var success = function(data) {
	res.send(200, {
		"status": "success",
		"data": data
	});
};


module.exports = {
  get_id: get_id
  , get_new_id: get_new_id
  , delete_id: delete_id
  , delete_from_id: delete_from_id
  , gi: gi
  , gi_search: gi_search
}