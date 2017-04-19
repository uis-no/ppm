var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var student = new Schema({

  _id : Number,

  name : String,

  mail : String,

  mobile : String,

  grades : Array,

  course : { type: String, ref: 'Course' }

});


module.exports = mongoose.model('Student', student);
