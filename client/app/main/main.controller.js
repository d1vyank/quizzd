'use strict';

angular.module('quizzdApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.polls = [];

    $http.get('/api/polls').success(function(polls) {
      $scope.polls = polls;
    });
  });
