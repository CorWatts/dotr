app.directive('backButton', ['$location', function($location) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			elem.bind('click', function () {
				var pieces = $location.path().split("/");
				var new_pieces = pieces.splice(0, pieces.length - 1);
				var new_url = new_pieces.join("/");
				scope.$apply(function() {
					$location.path(new_url);
				});
			});
		}
	};
}]);