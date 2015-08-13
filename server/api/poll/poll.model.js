'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var OptionSchema = new Schema({
  option: String,
  votes: Number
});

var PollSchema = new Schema({
  topic: String,
  createdBy: ObjectId,
  votedBy: [ObjectId],
  options: [OptionSchema]
});

module.exports = mongoose.model('Poll', PollSchema);
