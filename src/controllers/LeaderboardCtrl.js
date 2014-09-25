myApp.controller('LeaderboardCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.$id = 'leaderboardCtrl';

    $http({
            'method': 'GET',
            'url': '/allrunners'
        }).success(function(data){
            $scope.RUNNERS = data;
        });

}]);