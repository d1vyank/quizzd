'use strict';

angular.module('quizzdApp')
  .controller('PollCtrl', function ($scope, $routeParams, $http, $cookies) {
    $scope.poll = {};
    $scope.vote = {};
    $scope.chartLabels = [];
    $scope.chartData = [];

    var pollId = $routeParams.id;
    $http.get('/api/polls/'+pollId).then(function(response){
      var poll = response.data;
      $scope.poll = poll[0];
      $scope.poll.options.map(function(option){
        $scope.chartLabels.push(option.option);
        $scope.chartData.push(option.votes);
      });
    }, function(err) {
      $('.container').text('Poll not found.');
    });

    $scope.submitVote = function(option) {
      if(!option)
        return;
      $scope.poll.options[option].votes++;
      $scope.chartData[option]++;
      $http.put('/api/polls/'+pollId, $scope.poll);
    }

    $scope.hasVoted = function() {
      var cookie = $cookies.get('votedOn');
      if(cookie === undefined)
        return false;
      else {
        return cookie.indexOf(pollId) !== -1;
      }
    };
  });
