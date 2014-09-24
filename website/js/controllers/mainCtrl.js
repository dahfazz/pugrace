website.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

    $http({
        'url': '/stats',
        'method': 'GET'
    })
    .success(function(data){
        $scope.stats = data;
    });

}]);