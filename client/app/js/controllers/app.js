var AppCtrl = function($scope, $mdBottomSheet, $mdDialog, $location){

  $scope.isHome = function() {
    if($location.path() === "/")
      return true;

    return false;
  };

  // Toolbar search toggle
  $scope.toggleSearch = function(element) {
    $scope.showSearch = !$scope.showSearch;
  };

  // Bottomsheet & Modal Dialogs
  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: 
        '<md-bottom-sheet class="md-list md-has-header">' +
          '<md-list>' +
            '<md-list-item class="md-2-line" ng-repeat="item in items" role="link" md-ink-ripple ng-click="listItemClick($index)">' +
              '<ng-md-icon icon="{{item.icon}}"> </ng-md-icon>' +
              '<div class="md-list-item-text">' +
                '<h3>{{item.name}}</h3>' +
              '</div>' +
            '</md-list-item> ' +
          '</md-list>' +
        '</md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    });
  };
};

var ListBottomSheetCtrl = function($scope, $mdBottomSheet, $location) {
  $scope.items = [
  { name: 'About', icon: '', url: '/about'},
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
    $location.path(clickedItem.url);
  };
};

