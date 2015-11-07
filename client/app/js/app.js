var app = angular.module('dotrApp', ['ngMaterial', 'ngMdIcons', 'ngRoute']);

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

  $mdIconProvider
    .defaultIconSet("./assets/svg/avatars.svg", 128)
    .icon("menu"       , "./assets/svg/menu.svg"        , 24)
    .icon("share"      , "./assets/svg/share.svg"       , 24)
    .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
    .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
    .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
    .icon("phone"      , "./assets/svg/phone.svg"       , 512);



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
  otherwise({
    redirectTo: '/error'
  });
}]);


