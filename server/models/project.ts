var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var project = new Schema({
  // ISSUE : ObjectId is not recognized as a valid type, will use number until resolved
  _id : Number,

  course : { type: String, ref: 'Course' },

  title : String,

  description : String,

  proposer : { type: Number, ref: 'Proposer' },

  approved : Boolean,

  responsible : { type: Number, ref: 'Responsible' },

  advisor : { type: Number, ref: 'Advisor' },

  examiner : { type: Number, ref: 'Examiner' },

  student : [ { type: Number, ref: 'Student' } ],

  time_limits : Array
});


module.exports = mongoose.model('Project', project);
