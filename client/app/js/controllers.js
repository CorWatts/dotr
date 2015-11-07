app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdDialog', function($scope, $mdBottomSheet, $mdDialog){

	// Toolbar search toggle
	$scope.toggleSearch = function(element) {
		$scope.showSearch = !$scope.showSearch;
	};

	// Mock activity
	$scope.activity = [
		{
			what: 'Brunch this weekend?',
			who: 'Ali Conners',
			avatar: 'svg-1',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands",
			image: "//i.imgur.com/PtlR97G.gif"
		},
		{
			what: 'Summer BBQ',
			who: 'to Alex, Scott, Jennifer',
			avatar: 'svg-2',
			when: '3:08PM',
			notes: "Wish I could come out but I'm out of town this weekend",
			image: "//i.imgur.com/PtlR97G.gif"
		},
		{
			what: 'Oui Oui',
			who: 'Sandra Adams',
			avatar: 'svg-3',
			when: '3:08PM',
			notes: "Do you have Paris recommendations? Have you ever been?",
			image: "//i.imgur.com/PtlR97G.gif"
		},
		{
			what: 'Birthday Gift',
			who: 'Trevor Hansen',
			avatar: 'svg-4',
			when: '3:08PM',
			notes: "Have any ideas of what we should get Heidi for her birthday?",
			image: "//i.imgur.com/PtlR97G.gif"
		},
		{
			what: 'Recipe to try',
			who: 'Brian Holt',
			avatar: 'svg-5',
			when: '3:08PM',
			notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos",
			image: "//i.imgur.com/PtlR97G.gif"
		}
	];

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

	$scope.showAdd = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="user.lastName"> </md-input-container> </div> <md-input-container flex> <label>Message</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
			targetEvent: ev,
		})
		.then(function(answer) {
			$scope.alert = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.alert = 'You cancelled the dialog.';
		});
	};
}]);

app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
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
});

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

app.controller('CategoryCtrl', ['$scope', '$http',
  function ($scope, $http) {
	
    $http.get('api/categories').then(function(response) {
      $scope.categories = response.data.data;
    });
  }]);

app.controller('DemoCtrl', DemoCtrl);
function DemoCtrl ($timeout, $q) {
	var self = this;
	// list of `state` value/display objects
	self.states        = loadAll();
	self.selectedItem  = null;
	self.searchText    = null;
	self.querySearch   = querySearch;
	// ******************************
	// Internal methods
	// ******************************
	/**
	 * Search for states... use $timeout to simulate
	 * remote dataservice call.
	 */
	function querySearch (query) {
		var results = query ? self.states.filter( createFilterFor(query) ) : [];
		return results;
	}
	/**
	 * Build `states` list of key/value pairs
	 */
	function loadAll() {
		var allStates = 'Ali Conners, Alex, Scott, Jennifer, \
										Sandra Adams, Brian Holt, \
										Trevor Hansen';
		return allStates.split(/, +/g).map( function (state) {
			return {
				value: state.toLowerCase(),
				display: state
			};
		});
	}
	/**
	 * Create filter function for a query string
	 */
	function createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(state) {
			return (state.value.indexOf(lowercaseQuery) === 0);
		};
	}
};
