'use strict';

angular.module('quizzdApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll/:id', {
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl'
      });
  });
