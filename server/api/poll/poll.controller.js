'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');

var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;
// Get list of polls
exports.index = function(req, res) {
  Poll.find(function (err, polls) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(polls);
  });
};

exports.show = function(req, res) {
  var ids = req.params.id.split(',');
  Poll.find({
      _id: { $in: ids }
    }, function(err, polls){
    if(err) { return handleError(res, err); }
    if(polls.length === 0){ return res.status(404).send('Not Found'); }
    return res.status(200).json(polls);
  });

};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(poll);
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  var cookie = req.cookies.votedOn;
  if(cookie == undefined) {
    res.cookie('votedOn', [req.params.id]);
  }
  else if(cookie.indexOf(req.params.id) !== -1) {
    return res.status(403);
  }
  else {
    cookie.push(req.params.id);
    res.cookie('votedOn', cookie);
  }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    poll.options = req.body.options;
    poll.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(poll);
    });
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    poll.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
