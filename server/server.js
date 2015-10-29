var restify  = require('restify');
var _        = require('lodash');
var jsonfile = require('jsonfile');
var util     = require('util');
var errors   = require('./lib/errors');
var config   = require('./config/config');

var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.pre(restify.pre.sanitizePath());

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});

module.exports.restify = restify;
module.exports.server = server;
routes                = require("./routes");