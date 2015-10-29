var already_exists = function(res, type) {
  res.send(400, {
    response: "error",
    message: "The specified "+type+" already exists."
  });
}

var does_not_exist = function(res, type) {
  res.send(400, {
    response: "error",
    message: "The specified "+type+" does not exist."
  });
}

module.exports = {
  already_exists: already_exists,
  does_not_exist: does_not_exist
}
