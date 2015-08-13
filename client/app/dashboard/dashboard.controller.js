'use strict';

angular.module('quizzdApp')
  .controller('DashboardCtrl', function ($scope, $http) {
    $scope.polls = [];
    $scope.newPoll = {topic: '', options: []};
    $scope.textFields = ['',''];
    $scope.tabs = [
      { title:'New Poll', content: 'content' },
      { title:'My Polls', content: 'polls'}
    ];
    $http.get('/api/polls/').success(function(polls){
      $scope.polls = polls;
    });
    $scope.createPoll = function(form) {
      $scope.submitted = true;
      console.log($scope.polls);
    };

  });
