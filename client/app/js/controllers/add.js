var AddCtrl = function ($scope, $http, $routeParams, $location, _) {
  $scope.show = function($scope, $http, $routeParams) {
    $scope.value = "";
    $scope.formData = {};

    $scope.submit = function(type) {
      var url = ($scope.id) ? "api/" + type + "/" + $scope.id : "api/" + type;
      $http
        .post(url, $scope.formData)
        .then(function(response) {
          $location.path($scope.back_url);
        });
    };
  };

  $scope.getId = function(root, value) {
    if(root.length === 0)
      return false;

    var data = { value: value };
    return $http
      .get('api/' + root, {params: data})
      .then(function(response) {
        console.log(response);
        return response.data.data[0].id;
      });
  };

  $scope.checkType = function($routeParams) {
    if(_.has($routeParams, "category")) {
      if(_.has($routeParams, "subcategory")) {
        return "item";
      }
      return "subcategory";
    }
    return "category";
  };

  $scope.getData = function(type, $routeParams) {
    var type_plural = "categories";
    var parent_plural = "";
    var back_url = "";
    var value = "";

    switch(type) {
      case "category":
        type_plural = "categories";
        break;
      case "subcategory":
        type_plural = "subcategories";
        parent_plural = "categories";
        back_url = $routeParams.category;
        value = $routeParams.category;
        break;
      case "item":
        type_plural = "items";
        parent_plural = "subcategories";
        back_url = $routeParams.category + "/" +$routeParams.subcategory;
        value = $routeParams.subcategory;
        break;
      default:
        type_plural = "categories";
    }

    return {
      type_plural: type_plural,
      parent_plural: parent_plural,
      back_url: encodeURI(back_url),
    }

  };

  $scope.type = $scope.checkType($routeParams);

  $scope.data = $scope.getData($scope.type, $routeParams);
  $scope.type_plural = $scope.data.type_plural;
  $scope.parent_plural = $scope.data.parent_plural;
  $scope.pretty_type_plural = _.capitalize($scope.data.type_plural);
  $scope.back_url = $scope.data.back_url;
  $scope.value = $scope.data.value;

  $scope.pretty_type = _.capitalize($scope.type);
  $scope.type_article = ($scope.type === "item") ? "an" : "a";
  if($scope.type === "category") {
      $scope.show($scope, $http, $routeParams);
  } else {
    $scope
      .getId($scope.parent_plural, $scope.value)
      .then(function(id) {
        $scope.id = id;
        $scope.show($scope, $http, $routeParams);
      });;
  }
};

