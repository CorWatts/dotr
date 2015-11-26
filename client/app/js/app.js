var app = angular.module('dotrApp', ['ngMaterial', 'ngMdIcons', 'ngRoute'])
  .constant('_', window._);

app.config(function($mdThemingProvider) {
  var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('deep-orange');
  $mdThemingProvider.theme('input', 'default')
    .primaryPalette('grey')
});

app.config(function($mdThemingProvider, $mdIconProvider){

  var customCyanMap = $mdThemingProvider.extendPalette('cyan', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customCyan', customCyanMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customCyan', {
      'default': '500',
      'hue-1': '50'
    })
  .accentPalette('deep-orange');
  $mdThemingProvider.theme('input', 'default')
    .primaryPalette('grey');

});

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '../partials/category-list.html',
      controller: 'CategoryCtrl'
    }).
    when('/:category', {
      templateUrl: '../partials/subcategory-list.html',
      controller: 'SubcategoryCtrl'
    }).
    when('/:category/:subcategory', {
      templateUrl: '../partials/item-list.html',
      controller: 'ItemCtrl'
    }).
    otherwise({
      redirectTo: '/error'
    });
}]);
