'use strict'

var website = angular.module('website',['ngRoute']);

website.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
            templateUrl: '/website/partials/home.html',
            controller: 'mainCtrl'
        })
});