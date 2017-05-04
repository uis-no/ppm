var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var course = new Schema({

  _id : String,

  course : String,

  year : Number,

  deadlines: {
    instituteSuggest: Date,
    studentSuggest: Date,
    apply: Date,
    accept: Date,
    start: Date,
    submit: Date
  }
});


module.exports = mongoose.model('Course', course);
