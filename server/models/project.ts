var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var project = new Schema({
  // ISSUE : ObjectId is not recognized as a valid type, will use number until resolved
  _id : Number,

  course : { type: String, ref: 'Course' },

  title : String,

  description : String,

  proposer : [ { role: String, value: { type: Number, refPath: 'proposer.role' } } ],

  approved : Boolean,

  responsible : [ { role: String, value: { type: Number, refPath: 'responsible.role' } } ],

  advisor : [ { role: String, value: { type: Number, refPath: 'advisor.role' } } ],

  examiner : [ { role: String, value: { type: Number, refPath: 'examiner.role' } } ],

  student : [ { type: Number, ref: 'Student' } ],

  //time_limits : Array
});


module.exports = mongoose.model('Project', project);
