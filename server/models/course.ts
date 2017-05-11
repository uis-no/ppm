var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var course = new Schema({

  _id : String,

  course : String,

  year : Number,

  deadlines: {
    instituteSuggest: Date,
    studentSuggest: Date,
    studentApply: Date,
    studentAccept: Date,
    studentStart: Date,
    studentSubmit: Date
  }
});


module.exports = mongoose.model('Course', course);
