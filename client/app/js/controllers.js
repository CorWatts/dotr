
app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdDialog', '$location', AppCtrl]);
app.controller('ListBottomSheetCtrl', ['$scope', '$mdBottomSheet', '$location', ListBottomSheetCtrl]);
app.controller('CategoryCtrl', ['$scope', '$http', '$mdDialog', '_', CategoryCtrl]);
app.controller('SubcategoryCtrl', ['$scope', '$http', '$mdDialog', '$routeParams', '_', SubcategoryCtrl]);
app.controller('ItemCtrl', ['$scope', '$http', '$mdDialog', '$routeParams', '_', ItemCtrl]);
app.controller('AddCtrl', ['$scope', '$http', '$routeParams', '$location', '_', AddCtrl]);
