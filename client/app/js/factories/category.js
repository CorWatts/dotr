var CategoryFac = function($http) {
  var list = function() {
  	return $http.get('api/categories').then(function(response) {
      return response.data.data;
    });
  };

  return {
    list: list
  };
};
