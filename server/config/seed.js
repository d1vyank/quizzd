/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Poll = require('../api/poll/poll.model');


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'divyank'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Poll.find({}).remove(function(){
  Poll.create({
    topic:'What is the air speed velocity of a coconut laden swallow?',
    options: [{option:'Depends on the weight of the coconut', votes:50},
    {option:'Depends on the size of the swallow', votes:123},
    {option:'Both of the above', votes:345}]
  }, {
    topic:'What is your favorite frontend javascript framework?',
    options: [{option:'AngularJS',votes:12530},
    {option:'Ember.js',votes:143},
    {option:'React', votes: 531}]
  }
);
});
