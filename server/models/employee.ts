var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var employee = new Schema({

  _id : String,

  name : String,

  mail : String,

  mobile : String,

  course : { type: String, ref: 'Course' }

});


module.exports = mongoose.model('Employee', employee);
