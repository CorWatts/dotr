var ItemCtrl = function ($scope, $http, $mdDialog, $routeParams, _) {

  $scope.isHome = false;

  $scope.showEdit = function(ev, items, id, value) {
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
          $http.put('api/item/' + id , $scope.formData).then(function(response) {
            var arr_id = _.findIndex(items, function(item) {
              return item.id == id
            });
            items[arr_id] = response.data.data;
          });
          $mdDialog.hide();
        };
      },
      locals: {id: id, value: value},
      template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form ng-submit="update($scope)" name="add"> <h2>Edit a Item</h2> <div layout layout-sm="column"> <md-input-container flex> <label>Name</label> <input ng-model="formData.value" md-autofocus> </md-input-container> </form> </md-content> <md-dialog-actions layout="row"> <span flex></span> <md-button ng-click="cancel($event)"> Cancel </md-button> <md-button type="submit" class="md-primary"> Update </md-button> </md-dialog-actions></md-dialog>',
      targetEvent: ev
    }) .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };

  $scope.showDelete = function(ev, items, id) {
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
          $http.delete('api/item/'+id).then(function(response) {
            var arr_id = _.findIndex(items, function(item) {
              return item.id == id});
            items.splice(arr_id, 1);
            $mdDialog.hide();
          });
        };
      },
      locals: {id: id},
      template: '<md-dialog aria-label="Confirm Delete"> <md-content class="md-padding"> <h2>Are you sure you want to delete?</h2> <md-dialog-actions layout="row" layout-align="center"> <md-button ng-click="cancel()"> Cancel </md-button> <md-button ng-click="delete()" class="md-warn"> Delete</md-button> </md-dialog-actions></md-dialog>', targetEvent: ev }) .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };

  $scope.getItemList = function($scope, $http) {
    $http.get('api/items?parent_name='+$routeParams.subcategory).then(function(response) {
      $scope.categoryName = $routeParams.category;
      $scope.subcategoryName = $routeParams.subcategory;
      $scope.back_url = encodeURI($scope.categoryName);
      $scope.items = response.data.data;
      $scope.categoryId = response.data.parent_id;
    });
  };

  $scope.getItemList($scope, $http);
};
