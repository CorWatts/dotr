var CategoryCtrl = function ($scope, $http, $mdDialog, _) {

  var categoryControllerMethods = function() {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function(ev2) {
      ev2.preventDefault();
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

  $scope.showEdit = function(ev, categories, id, value) {
    $mdDialog.show({
      controller: function ($scope, $http, $mdDialog, id, value) {
        //categoryControllerMethods.call(this)
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function(ev2)  {
          ev2.preventDefault();
          $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
        $scope.formData = {id: id, value: value};
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.update = function() {
          $http.put('api/category/' + id , $scope.formData).then(function(response) {
            var arr_id = _.findIndex(categories, function(category) {
              return category.id == id});
            categories[arr_id] = response.data.data;
          });
          $mdDialog.hide();
        };
      },
      locals: {id: id, value: value},
      template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form ng-submit="update($scope)" name="add"> <h2>Edit a Category</h2> <div layout layout-sm="column"> <md-input-container flex> <label>Name</label> <input ng-model="formData.value" md-autofocus> </md-input-container> </md-content> <md-dialog-actions layout="row"> <span flex></span> <md-button ng-click="cancel($event)"> Cancel </md-button> <md-button class="md-primary" type="submit"> Update </md-button> </md-dialog-actions> </form> </md-dialog>',
      targetEvent: ev
    });
  };

  $scope.showDelete = function(ev, categories, id) {
    $mdDialog.show({
      controller: function ($scope, $http, $mdDialog, id) {
        categoryControllerMethods.call(this)
        $scope.formData = {};
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.delete = function() {
          $http.delete('api/category/'+id).then(function(response) {
            var arr_id = _.findIndex(categories, function(category) {
              return category.id == id});
            categories.splice(arr_id, 1);
            $mdDialog.hide();
          });
        };
      },
      locals: {id: id},
      template: '<md-dialog aria-label="Confirm Delete"> <md-content class="md-padding"> <h2>Are you sure you want to delete?</h2> <md-dialog-actions layout="row" layout-align="center"> <md-button ng-click="cancel()"> Cancel </md-button> <md-button ng-click="delete()" class="md-warn"> Delete</md-button> </md-dialog-actions></md-dialog>',
      targetEvent: ev
    });
  };

  $scope.getCategoryList = function($scope, $http) {
    $http.get('api/categories').then(function(response) {
      $scope.categories = response.data.data;
    });
  };

  $scope.getCategoryList($scope, $http);
};
