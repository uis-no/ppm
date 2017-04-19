var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var project = new Schema({
  // ISSUE : ObjectId is not recognized as a valid type, will use number until resolved
  _id : Number,

  /* TODO: use this to remove the need to manually assign an id
  _id :{
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    auto: true
  },
  */

  course : { type: String, ref: 'Course' },

  title : String,

  description : String,

  proposer : [ { role: String, user: { type: String, refPath: 'proposer.role' } } ],

  approved : Boolean,

  responsible : [ { role: String, user: { type: Number, refPath: 'responsible.role' } } ],

  advisor : [ { role: String, user: { type: Number, refPath: 'advisor.role' } } ],

  examiner : [ { role: String, user: { type: Number, refPath: 'examiner.role' } } ],

  student : [ { type: Number, ref: 'Student' } ],

  submission : {
    type: Schema.Types.ObjectId,
    ref: 'fs.files'
  }
});


module.exports = mongoose.model('Project', project);
