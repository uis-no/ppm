var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var course = new Schema({
  
  _id : String,

  course : String,

  year : Number

});


module.exports = mongoose.model('Course', course);
