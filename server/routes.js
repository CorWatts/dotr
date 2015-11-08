var namespace = require('restify-namespace');

var server = module.parent.exports.server;
var restify = module.parent.exports.restify;

var categoryController = require("./controllers/category");
var subcategoryController = require("./controllers/subcategory");
var helpers  = require('./lib/helpers');
var itemController = require("./controllers/item");

server.get(/^\/(?!api).*/, restify.serveStatic({
    directory: __dirname + '/../client/app',
      default: "index.html"
}));

namespace(server, '/api', function () {
  // category actions
  server.get('/categories', categoryController.list);
  server.get('/category/:id', categoryController.get);
  server.put('/category/:id', categoryController.put);
  server.get('/category/:id/sub', categoryController.sub);
  server.post('/category', categoryController.post);
  server.del('/category/:id', categoryController.destroy);

  //// subcategory actions
  server.get('/subcategories', subcategoryController.list);
  server.get('/subcategory/:id', subcategoryController.get);
  server.post('/subcategory/:category', subcategoryController.post);
  server.del('/subcategory', subcategoryController.destroy);

  // item actions
  server.get('/items', itemController.list);
  server.get('/item/:id', itemController.get);
  server.post('/item/:subcategory', itemController.post);
  server.del('/item', itemController.destroy);
});

