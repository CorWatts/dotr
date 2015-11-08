var CategoryCtrl = function ($scope, $http, $mdDialog, _) {
  $scope.showAdd = function(ev, categories) {
    $mdDialog.show({
      controller: function ($scope, $http, $mdDialog) {
        $scope.formData = {};
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
        $scope.submit = function() {
          $http.post('api/category', $scope.formData).then(function(response) {
            categories.push(response.data.data);
            $mdDialog.hide();
          });
        };
      },
      template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form name="add" ng-submit="submit($event)"> <h2>Add a Category</h2> <div layout layout-sm="column"> <md-input-container flex> <label>Name</label> <input ng-model="formData.value"> </md-input-container> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="cancel($event)"> Cancel </md-button> <md-button class="md-primary" type="submit"> Save </md-button> </div> </form> </md-dialog>',
      targetEvent: ev
    }) .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };

  $scope.showEdit = function(ev, categories, id, value) {
    $mdDialog.show({
      controller: function ($scope, $http, $mdDialog, id, value) {
        $scope.formData = {id: id, value: value};
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

        $scope.update = function() {
          $http.put('api/category/' + id , $scope.formData).then(function(response) {
            var arr_id = _.findIndex(categories, function(category) {
              return category.id == id});
            categories[arr_id] = response.data.data;
            $mdDialog.hide();
          });
        };
      },
      locals: {id: id, value: value},
      template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form ng-submit="update($scope)" name="add"> <h2>Edit a Category</h2> <div layout layout-sm="column"> <md-input-container flex> <label>Name</label> <input ng-model="formData.value"> </md-input-container> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="cancel($event)"> Cancel </md-button> <md-button class="md-primary" type="submit"> Update </md-button> </div> </form> </md-dialog>',
      targetEvent: ev
    }) .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };

  $scope.showDelete = function(ev, categories, id) {
    $mdDialog.show({
      controller: function ($scope, $http, $mdDialog, id) {
        $scope.formData = {};
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
        $scope.delete = function() {
          $http.delete('api/category/'+id).then(function(response) {
            var arr_id = _.findIndex(categories, function(category) {
              return category.id == id});
            console.log(arr_id);
            categories.splice(arr_id, 1);
            console.log(categories);
            $mdDialog.hide();
          });
        };
      },
      locals: {id: id},
      template: '<md-dialog aria-label="Confirm Delete"> <md-content class="md-padding"> <h2>Are you sure you want to delete?</h2> <div class="md-actions" layout="row" layout-align="center"> <md-button ng-click="cancel()"> Cancel </md-button> <md-button ng-click="delete()" class="md-warn"> Delete</md-button> </div> </div></md-dialog>', targetEvent: ev }) .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };

  $scope.getCategoryList = function($scope, $http) {
    $http.get('api/categories').then(function(response) {
      $scope.categories = response.data.data;
    });
  };

  $scope.getCategoryList($scope, $http);
};
