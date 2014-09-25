myApp.controller('RacesCtrl', ['$scope', '$rootScope', '$location', '$http',
    function($scope, $rootScope, $location, $http) {

    var me = JSON.parse(localStorage.getItem('pugrunner_me'));


    function init() {

        if (!me.race_name) $location.path('/races');

        if (me) {
            var data = {
                'me': me
            }
            socket.emit('restoreMe', data)
        }

        $http({
            'method': 'GET',
            'url': '/allraces'
        }).success(function(races){
            $scope.RACES = races;
        });
    };

    init();


    // Create race
    $scope.createRaceSubmit = function () {
        var name = $scope.newRace_name;
        if (name) {
            me.steps = 0;
            var race = new Race(name, me);
            localStorage.setItem('pugrunner_me', JSON.stringify(me))
            race.runners[me.name] = me;

            var data = {
                'race': race,
                'owner': me
            }

            socket.emit('askNewRace', data);
        }
    }


    $scope.joinRace = function(event, race) {
        event.preventDefault();
        me.race_name = race.name;
        me.steps = 0;
        localStorage.setItem('pugrunner_me', JSON.stringify(me));

        var socketData = {'runner': me, 'race': race};
        socket.emit('joinRace', socketData);
        console.log('JOIN')
        $location.path('/race');
    }


    $scope.leaveRace = function(event) {
        event.preventDefault();
        me.race_name = null;
        localStorage.setItem('pugrunner_me', JSON.stringify(me));
        event.target.remove();
        $location.reload();
    };
    
    
    
    // Insert new race
    socket.on('newRaceCreated', function(data) {

        var newRace = data.race.name, 
            races = data.races;

        $scope.newRace_name = '';
        $scope.RACES = races;
        $scope.$apply();

        if (races[newRace].owner.name === me.name) {
            joinRace(newRace);
        }
    });



    socket.on('updateRaces', function(races) {
        $scope.RACES = races;
        $scope.$apply();
    });
    
    
    function joinRace(race) {
        me.race_name = race;
        me.steps = 0;
        localStorage.setItem('pugrunner_me', JSON.stringify(me));
        socket.emit('newChallenger', race);
        
        $location.path('/race');
        $scope.$apply();
    }

}]);