'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var ObjectID = require('mongodb').ObjectID;

describe('GET /api/polls', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/polls')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('GET /api/poll', function() {

  it('should respond with 404 for a random ObjectId', function(done){
    var dummyID = new ObjectID(Date.now());
    request(app)
      .get('/api/poll'+dummyID)
      .expect(404)
      .end(function(err, res){
        if(err) return done(err);
        done();
      });
  });
});
