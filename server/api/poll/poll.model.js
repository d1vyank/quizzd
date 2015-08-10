'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OptionSchema = new Schema({
  option: String,
  votes: Number
});

var PollSchema = new Schema({
  topic: String,
  createdBy: String,
  votedBy: [String],
  options: [OptionSchema];
});

module.exports = mongoose.model('Poll', PollSchema);
