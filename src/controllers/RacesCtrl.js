myApp.controller('RacesCtrl', ['$scope', '$rootScope', '$location', '$http',
    function($scope, $rootScope, $location, $http) {

    $scope.me = JSON.parse(localStorage.getItem('pugrunner_me'));


    function init() {

        if (!$scope.me.race_name) $location.path('/races');

        if ($scope.me) {
            var data = {
                'me': $scope.me
            };
            socket.emit('restoreMe', data);
        }

        $http({
            'method': 'GET',
            'url': '/allraces'
        }).success(function(races){
            $scope.RACES = races;
        });
    }

    init();


    // Create race
    $scope.createRaceSubmit = function () {
        var name = $scope.newRace_name;
        if (name) {
            $scope.me.steps = 0;
            var race = new Race(name, $scope.me);
            localStorage.setItem('pugrunner_me', JSON.stringify($scope.me));
            race.runners[$scope.me.name] = $scope.me;

            var data = {
                'race': race,
                'owner': $scope.me
            };

            socket.emit('askNewRace', data);
        }
    };


    $scope.joinRace = function(event, race) {
        event.preventDefault();
        $scope.me.steps = 0;
        $scope.me.race_name = race.name;
        localStorage.setItem('pugrunner_me', JSON.stringify($scope.me));

        var socketData = {'runner': $scope.me, 'race': race};
        socket.emit('joinRace', socketData);
        $location.path('/race');
    };


    $scope.leaveRace = function(event) {
        event.preventDefault();
        $scope.me.race_name = null;
        localStorage.setItem('pugrunner_me', JSON.stringify($scope.me));
        event.target.remove();
        $location.reload();
    };


    $scope.deleteRace = function(event, race, runner) {
        event.preventDefault();
        var data = {
            'race': race,
            'runner': runner
        }
        socket.emit('tryDeleteRace', data);
    };
    
    
    
    // Insert new race
    socket.on('newRaceCreated', function(data) {
        var newRace = data.race.name, 
            races = data.races;

        $scope.newRace_name = '';
        $scope.RACES = races;
        $scope.$apply();

        if (races[newRace].owner.name === $scope.me.name) {
            joinRace(newRace);
        }
    });


    socket.on('duplicatedRacename', function() {
        alert('Duplicated race name');
    });



    socket.on('updateRaces', function(races) {
        $scope.RACES = races;
        $scope.$apply();
    });
    
    
    function joinRace(race) {
        $scope.me.race_name = race;
        $scope.me.steps = 0;
        localStorage.setItem('pugrunner_me', JSON.stringify($scope.me));
        socket.emit('newChallenger', race);
        
        $location.path('/race');
        $scope.$apply();
    }


    $scope.quit = function(event) {
        localStorage.clear();
        $location.path('/');
    }

}]);