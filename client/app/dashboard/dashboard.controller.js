'use strict';

angular.module('quizzdApp')
  .controller('DashboardCtrl', function ($scope, $http, $location,Auth, User) {
    var user = Auth.getCurrentUser();
    $scope.polls = [];
    $scope.newPoll = {topic: '', options: []};
    $scope.textFields = [ 1,2 ];
    $scope.alerts = [];

    user.$promise.then(function() {
      var myPollIds = user.polls.join(',');
      if(myPollIds.length !== 0) {
        $http.get('/api/polls/'+myPollIds).success(function(polls){
          $scope.polls = polls;
        });
      }
    });

    $scope.createPoll = function(form) {
      $scope.submitted = true;
      if(!form.$valid)
        return;
      $scope.newPoll.createdBy = user._id;
      $scope.newPoll.votedBy = [];
      $scope.newPoll.options = $scope.newPoll.options.map(function(value){
        return {option: value, votes: 0};
      });
      $http.post('/api/polls', $scope.newPoll).success(function(poll){
        $scope.polls.push(poll);
        user.polls.push(poll._id);
        $scope.addAlert(poll._id);
        $http.put('/api/users/'+ user._id, user);
      });
      $scope.newPoll = {topic: '', options: []};
      $scope.submitted = false;
    };

    $scope.deletePoll = function(poll) {
      $scope.polls = $scope.polls.filter(function(item){
        return item._id !== poll._id;
      });
      user.polls = user.polls.filter(function(item){
        return item !== poll._id;
      });
      $http.delete('/api/polls/' + poll._id).success(function(){
        $http.put('/api/users/'+ user._id, user);
      });
    };
    $scope.addAlert = function(pollId) {
      var url = 'http://' + $location.host() + '/poll/' + pollId;
      $scope.alerts.push({type: 'success', msg: 'Poll created!', url: url});
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });
