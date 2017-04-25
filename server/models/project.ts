var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var project = new Schema({
  _id : Number,

  course : { type: String, ref: 'Course' },

  title : String,

  description : String,

  proposer : { role: String, _id: { type: String, refPath: 'proposer.role' } },

  status : String,
  // TODO: change user to _id if needed
  responsible : { role: String, _id: { type: String, refPath: 'responsible.role' } },

  advisor : [ { role: String, _id: { type: String, refPath: 'advisor.role' } } ],

  examiner : [ { role: String, _id: { type: String, refPath: 'examiner.role' } } ],
/*
  applied: [ [{type: Number, ref: 'Student'}]],

  assigned : [ { type: Number, ref: 'Student' } ],
  */

  student : [ { type: String, ref: 'Student' } ],

  submission : {
    type: Schema.Types.ObjectId,
    ref: 'fs.files'
  }
});


module.exports = mongoose.model('Project', project);
