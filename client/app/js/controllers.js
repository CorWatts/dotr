//var SubcategoryCtrl = function ($scope, $http) {};

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdDialog', AppCtrl]);
app.controller('ListBottomSheetCtrl', ['$scope', '$mdBottomSheet', ListBottomSheetCtrl]);
app.controller('CategoryCtrl', ['$scope', '$http', '$mdDialog', '_', CategoryCtrl]);
//app.controller('SubcategoryCtrl', ['$scope', '$http', SubcategoryCtrl]);
