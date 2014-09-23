'use strict'

var myApp = angular.module('myApp',['ngRoute', 'ngSanitize']);

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
        });
      
    // configure html5 to get links working on jsfiddle
    //$locationProvider.html5Mode(true);
    });