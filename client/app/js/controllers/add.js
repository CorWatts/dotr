var AddCtrl = function ($scope, $http, $routeParams, $location, _) {
    $scope.checkType = function(type) {
      return (['category', 'subcategory', 'item'].indexOf(type) > -1) ? type : 'category';
    };
    $scope.type = $scope.checkType($routeParams.type);
    $scope.type_article = ($scope.type === "item") ? "an" : "a";
    switch($scope.type) {
      case "category":
        $scope.type_plural = "Categories";
        break;
      case "subcategory":
        $scope.type_plural = "Subcategories";
        break;
      case "item":
        $scope.type_plural = "Items";
        break;
      default:
        $scope.type_plural = "Categories";
    }
    $scope.pretty_type = _.capitalize($scope.type);



  $scope.show = function($scope, $http, $routeParams) {
    $scope.value = "";
    $scope.formData = {};

    $scope.cancel = function(ev2)  {
      ev2.preventDefault();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
    $scope.submit = function() {
      $http.post('api/category', $scope.formData).then(function(response) {
        $location.path('/');
      });
    };
  };

  $scope.show($scope, $http, $routeParams);
};

