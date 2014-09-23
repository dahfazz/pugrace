myApp.controller('LoginCtrl', ['$scope', function($scope) {

    $scope.loginModal = false;

    $scope.$on('openLoginModal', function() {
        $scope.loginModal = true;
    });
    
    $scope.closeLoginModal = function () {
        $scope.loginModal = false;
    }
    
    
    $scope.loginSubmit = function(event) {
        event.preventDefault();
        
        console.log($scope.hello)
        
        var _name       = $scope.login_name_a.toUpperCase() + $scope.login_name_b.toUpperCase() + $scope.login_name_c.toUpperCase();
        var _pwd        = $scope.loginPwd;
        
        console.log(_name, _pwd)
    }
}]);