myApp.controller('LeaderboardCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.$id = 'leaderboardCtrl';
    $scope.array = [];

    $http({
            'method': 'GET',
            'url': '/allrunners'
        }).success(function(data){

            angular.forEach(data, function(value, key) {
                $scope.array.push(value);
            });
        });
}]);