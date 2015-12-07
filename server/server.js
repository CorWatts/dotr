var restify  = require('restify');

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