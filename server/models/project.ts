var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var project = new Schema({
  // ISSUE : ObjectId is not recognized as a valid type, will use number until resolved
  _id : {
    type : Number,
    auto: true
  },

  title : {
    type : String

  },
  advisors : {
    type : String

  },
  proposer : {
    type : String

  },
  important_courses : {
    type : String

  },
  background : {
    type : String

  },
  motivation : {
    type : String

  },
  methods : {
    type : String

  },
  objectives : {
    type : String

  },
  students_assigned : {
    type : String
  }
});


module.exports = mongoose.model('Project', project);
