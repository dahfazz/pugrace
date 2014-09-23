
myApp.controller('JoinCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    
    $scope.$id = 'JoinCtrl';


    if (localStorage.getItem('pugrunner_me')) {
        $location.path('/races');
    }
    
    var me;
    $scope.character = 'blackpug';
    

    $scope.openLoginModal = function() {
        $rootScope.$broadcast('openLoginModal');
    };

    
    $scope.nextInput = function(sel) {
        document.querySelector(sel).focus();
    }
    
    
    $scope.createRunner = function () {

        var _name       = $scope.name_a.toUpperCase() + $scope.name_b.toUpperCase() + $scope.name_c.toUpperCase();
        var _character  = $scope.character;
        var _pwd        = $scope.join_pwd;

        if (_name) {
            me = new Runner(_name, _character, _pwd);
            socket.emit('askCreateRunner', me);
        }
    }
    
    socket.on('runnerCreated', function(runner) {
        localStorage.setItem('pugrunner_me', JSON.stringify(runner));
        $location.path('/races');
        $scope.$apply();
    });

    socket.on('unavailableName', function(){
        alert('unavailable name');
        names[0].value = '';
        names[1].value = '';
        names[2].value = '';
    });
    
    
    $scope.$on('updateCharacter', function(event, char) {
        $scope.character = char;
    });

}]);