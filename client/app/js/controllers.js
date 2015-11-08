var AppCtrl = function($scope, $mdBottomSheet, $mdDialog){
	// Toolbar search toggle
	$scope.toggleSearch = function(element) {
		$scope.showSearch = !$scope.showSearch;
	};

	// Bottomsheet & Modal Dialogs
	$scope.alert = '';
	$scope.showListBottomSheet = function($event) {
    console.log("here");
		$scope.alert = '';
		$mdBottomSheet.show({
			template: '<md-bottom-sheet class="md-list md-has-header"><md-list><md-list-item class="md-2-line" ng-repeat="item in items" role="link" md-ink-ripple><md-icon md-svg-icon="{{item.icon}}" aria-label="{{item.name}}"></md-icon><div class="md-list-item-text"><h3>{{item.name}}</h3></div></md-list-item> </md-list></md-bottom-sheet>',
			controller: 'ListBottomSheetCtrl',
			targetEvent: $event
		}).then(function(clickedItem) {
			$scope.alert = clickedItem.name + ' clicked!';
		});
	};
};

var ListBottomSheetCtrl = function($scope, $mdBottomSheet) {
	$scope.items = [
	{ name: 'Share', icon: 'social:ic_share_24px' },
	{ name: 'Upload', icon: 'file:ic_cloud_upload_24px' },
	{ name: 'Copy', icon: 'content:ic_content_copy_24px' },
	{ name: 'Print this page', icon: 'action:ic_print_24px' },
	];

	$scope.listItemClick = function($index) {
		var clickedItem = $scope.items[$index];
		$mdBottomSheet.hide(clickedItem);
	};
};

var CategoryCtrl = function ($scope, $http, $mdDialog) {
  $scope.showAdd = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form name="add"> <h2>Add a Category</h2> <div layout layout-sm="column"> <md-input-container flex> <label>Name</label> <input ng-model="user.value"> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
    .then(function(answer) {
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

function DialogController($scope, $mdDialog) {
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
};

//var SubcategoryCtrl = function ($scope, $http) {};

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdDialog', AppCtrl]);
app.controller('ListBottomSheetCtrl', ['$scope', '$mdBottomSheet', ListBottomSheetCtrl]);
app.controller('CategoryCtrl', ['$scope', '$http', '$mdDialog', CategoryCtrl]);
//app.controller('SubcategoryCtrl', ['$scope', '$http', SubcategoryCtrl]);
