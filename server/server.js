var restify  = require('restify');
var Logger = require('bunyan');

var log = new Logger({name: 'dotr'});
var server = restify.createServer({
  name: "dotr",
  log: log
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.pre(restify.pre.sanitizePath());

server.listen(8080, function() {
    log.info({addr: server.address()}, 'listening');
});

module.exports.restify = restify;
module.exports.server = server;
routes                = require("./routes");