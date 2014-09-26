myApp.controller('LoginCtrl', ['$scope', '$location', function($scope, $location) {

    $scope.$id = 'loginCtrl';
    $scope.loginModal = false;

    $scope.$on('openLoginModal', function() {
        $scope.loginModal = true;
    });
    
    $scope.closeLoginModal = function () {
        $scope.loginModal = false;
    };
    
    
    $scope.loginSubmit = function(event) {

        var _name       = $scope.login_A.toUpperCase() + $scope.login_B.toUpperCase() + $scope.login_C.toUpperCase();
        var _pwd        = $scope.login_PWD;
        
        var data = {
            'name': _name,
            'password': _pwd
        };

        socket.emit('tryLogin', data);
    };

    socket.on('logginOK', function(runner) {
        localStorage.setItem('pugrunner_me', JSON.stringify(runner));
        $location.path('/races');
        $scope.$apply();
    });
}]);