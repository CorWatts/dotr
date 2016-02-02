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

app.config(function($mdThemingProvider){

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
    when('/about', {
      //templateUrl: '../partials/about.html',
      template: '<div class="relative" ng-controller="AppCtrl">' +
        '<md-toolbar class="animate-show md-whiteframe-z1">' +
          '<div class="md-toolbar-tools">' +
            '<md-button aria-label="Go Back" class="md-icon-button" ng-href="#/">' +
              '<ng-md-icon icon="arrow_back" style="fill: white"></ng-md-icon>' +
            '</md-button>' +
            '<md-title><a href="#/">Dotr -- dote on those you love</a></md-title>' +
            '<span flex></span>' +
            '<md-button class="md-icon-button" aria-label="Open Settings" ng-click="showListBottomSheet($event)">' +
            '<ng-md-icon icon="more_vert" style="fill: white"></ng-md-icon>' +
            '</md-button>' +
          '</div>' +
        '</md-toolbar>' +
      '' +
        '<md-content flex layout-padding>' +
          '<section layout="row" layout-xs="column" layout-align="start center" layout-wrap>' +
            '<md-subheader>About Dotr</md-subheader>' +
          '<p>Dotr is a wishlist, note-taker, and memory store all in one. Those who wish to dote or those who wish to be doted on, can keep track of activities, consumables, goods, and gestures they would love to give or receive.</p>' +
          '<p>You can find Dotr source code online at <a href="https://github.com/CorWatts/dotr">https://github.com/CorWatts/dotr</a>. Any and all contributions are welcome!' +
          '<p>Thanks for using Dotr. Please contact <span class="bold">corwatts [@] gmail [dot] com</span> if you have any questions.</p>' +
          '</section>' +
        '</md-content>' +
      '</div>',
      controller: 'AppCtrl'
    }).
    when('/add', {
      templateUrl: '../partials/add.html',
      controller: 'AddCtrl'
    }).
    when('/:category/add', {
      templateUrl: '../partials/add.html',
      controller: 'AddCtrl'
    }).
    when('/:category/:subcategory/add', {
      templateUrl: '../partials/add.html',
      controller: 'AddCtrl'
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
    //when('/:type/edit', {
      //templateUrl: '../partials/edit.html',
      //controller: 'EditController'
    //}).
}]);
