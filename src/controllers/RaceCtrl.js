myApp.controller('RaceCtrl', ['$scope', '$rootScope', '$timeout', '$http', '$interval', '$routeParams', '$location', function($scope, $rootScope, $timeout, $http, $interval, $routeParams, $location) {

    $scope.$id = 'RaceCtrl';

    $rootScope.WINNER = false;
    $rootScope.LOOSER = false;


    var questionTimer = 10,
        timeout,
        interval;

    $scope.me = JSON.parse(localStorage.getItem('pugrunner_me'));

    if ($routeParams.raceName && $routeParams.runnerName) {

        $http({
            'method': 'GET',
            'url': '/runner/' + $routeParams.runnerName
        }).success(function(runner){
            $scope.me = runner;
        });

        $http({
            'method': 'GET',
            'url': '/race/' + $routeParams.raceName
        }).success(function(race){

            $scope.RACE = race;
            $scope.QUESTIONS = race.quizz.items;

            if ($scope.RACE && $scope.RACE.state !== 'waiting') {
                $scope.startButton = false;
            }

            if ($scope.RACE && $scope.RACE.owner.name === $scope.me.name) {
                $scope.startButton = true;
            }
        });
    } else {
        init();
    }

    function init() {

        if (!$scope.me.race_name) window.location = '/races';

        $http({
            'method': 'GET',
            'url': '/race/' + $scope.me.race_name
        }).success(function(race){

            $scope.RACE = race;
            $scope.QUESTIONS = race.quizz.items;

            if ($scope.RACE && $scope.RACE.state !== 'waiting') {
                $scope.startButton = false;
            }

            if ($scope.RACE && $scope.RACE.owner.name === $scope.me.name) {
                $scope.startButton = true;
            }
        });
    }


    /* NEW CHALLENGER
        - race
    */
    socket.on('newChallenger', function(race) {
        if ($scope.me.race_name === race.name) {
            $scope.RACE.runners = race.runners;
            $scope.$apply();
        }
    });



    /*  OWNER STARTS RACE  */
    $scope.startRace = function(event) {
        event.preventDefault();
        event.target.remove();

        var data = {
            'race': $scope.RACE,
            'remainingQuizzSIze': $scope.RACE.quizz.items.length
        };

        socket.emit('raceStarted', data);
        socket.emit('nextQuestion', data);
    };


    /* NEXT STEP
        - race
        - question_key
    */
    socket.on('goToNextQuestion', function(data) {

        // Not for me
        if (data.race.name !== $scope.me.race_name) return;

        $scope.QUESTION_KEY = data.question_key;
        $scope.RACE.runners[$scope.me.name].state = 'waiting';

        var obj = {
            'race': $scope.RACE,
            'remainingQuizzSIze': $scope.RACE.quizz.items.length
        };

        $interval.cancel(interval);
        $timeout.cancel(timeout);

        $scope.timer = questionTimer;
        interval = $interval(function(){
            $scope.timer--;
        }, 1000);

        timeout = $timeout(function() {
            socket.emit('nextQuestion', obj);
        }, questionTimer * 1000);
        //$scope.$apply();
    });



    /* SEND ANSWER */
    $scope.sendAnswer = function(event, option_key) {
        event.preventDefault();

        var data = {
            'race':         $scope.RACE,
            'runner':       $scope.me,
            'question_key': $scope.QUESTION_KEY,
            'option_key':   option_key,
            'timestamp':    Date.now()
        };

        socket.emit('sendAnswer', data);
    };


    /* REWARD
        - runner
        - race
        - question_key
        - goodanswer
    */
    socket.on('reward', function(data) {

        // Not my race
        if (data.race.name !== $scope.me.race_name) return;

        // If it is a good answer
        if (data.goodanswer) {

            $scope.RACE.runners[data.runner.name].state = 'animated';
            $scope.RACE.runners[data.runner.name].steps += 10;
            $scope.$apply();

            // ...and if it was given by me
            if (runner_name === $scope.me.name) {
                $scope.me.steps = $scope.RACE.runners[data.runner.name].steps;
                localStorage.setItem('pugrunner_me', JSON.stringify($scope.me));
                socket.emit('runnerUpdated', $scope.me);
            }

            // Stop the runner
            var runner_name = data.runner.name,
                obj = {
                    'race': $scope.RACE,
                    'remainingQuizzSIze': $scope.RACE.quizz.items.length
                };

            $timeout(function() {
                $scope.RACE.runners[runner_name].state = 'rewarded';
                socket.emit('nextQuestion', obj);
            }, 500);

        } else {

            // Wrong answer ...and if it's mine
            if (data.runner.name === $scope.me.name) {
                $scope.RACE.runners[data.runner.name].state = 'answered';
                $scope.$apply();
                socket.emit('runnerUpdated', $scope.me);
            }
        }
    });




    /* FINISH LINE
        - runner
        - race
        - question_key
        - goodanswer
    */
    socket.on('finish', function(data) {
        // Not my race
        if (data.race.name !== $scope.me.race_name) return;

        $interval.cancel(interval);
        $timeout.cancel(timeout);

        if ($scope.me.name === data.runner.name) {
            $scope.me.score += 10;
            localStorage.setItem('pugrunner_me', JSON.stringify($scope.me));
            $rootScope.WINNER = true;
        } else {
            $rootScope.LOOSER = true;
        }
    });



    /* ERROR : NO RACE */
    socket.on('noRace', function() {
        window.location = '/races';
    });


    $scope.$on('$destroy', function() {
        $interval.cancel(interval);
        $timeout.cancel(timeout);

        $rootScope.WINNER = false;
        $rootScope.LOOSER = false;
    });

}]);