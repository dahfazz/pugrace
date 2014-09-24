website.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {


    $scope.url_github  = 'https://github.com/dahfazz/pugrace';
    $scope.url_twitter = 'https://twitter.com/_faz';

    $http({
        'url': '/stats',
        'method': 'GET'
    })
    .success(function(data){
        $scope.stats = data;
    });

}]);