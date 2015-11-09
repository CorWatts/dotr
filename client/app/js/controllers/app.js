var AppCtrl = function($scope, $mdBottomSheet, $mdDialog){
	// Toolbar search toggle
	$scope.toggleSearch = function(element) {
		$scope.showSearch = !$scope.showSearch;
	};

	// Bottomsheet & Modal Dialogs
	$scope.alert = '';
	$scope.showListBottomSheet = function($event) {
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

