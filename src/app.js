'use strict';

var myApp = angular.module('myApp',['ngRoute', 'ngSanitize', 'monospaced.qrcode']);

myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/join.html',
            controller: 'JoinCtrl'
        })
        
        .when('/races', {
            templateUrl: '/views/races.html',
            controller: 'RacesCtrl'
        })

        .when('/race', {
            templateUrl: '/views/race.html',
            controller: 'RaceCtrl'
        })

        .when('/race/:raceName/:runnerName', {
            templateUrl: '/views/race.html',
            controller: 'RaceCtrl'
        })

        .when('/leaderboard', {
            templateUrl: '/views/leaderboard.html',
            controller: 'LeaderboardCtrl'
        })
    ;
    });