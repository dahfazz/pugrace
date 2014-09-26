myApp.controller('NameCtrl', ['$scope', function($scope) {
    
    $scope.nextInput = function(sel) {
        document.querySelector(sel).focus();
    };

}]);