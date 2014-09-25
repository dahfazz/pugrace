myApp.controller('AppCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.$id = 'appCtrl';
    
    $scope.appTitle = "Pug Race";
    $scope.loading  = false;

    $scope.$on('loading', function(event, value){
        $scope.loading = value;
    });




    $scope.$on("$routeChangeSuccess", function(event, current, previous, resolve) {
        $http({method: 'GET', url: '/allraces'}).
            success(function(data, status, headers, config) {
                $scope.races = data;
            });

        $http({method: 'GET', url: '/allrunners'}).
            success(function(data, status, headers, config) {
                $scope.runners = data;
            });
    });


    $scope.goto = function(event, route) {
        event.preventDefault();
        $location.path(route);
    };
}]);