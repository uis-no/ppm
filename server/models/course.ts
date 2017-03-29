var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var course = new Schema({
  _id : {
    type : String,
    auto: true
  },

  year : {
    type : String
  }
});


module.exports = mongoose.model('Course', course);
