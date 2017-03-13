var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var student = new Schema({
  _id : {
    type : Number,
    auto: true
  },

  name : {
    type : String
  },

  mail : {
    type : String
  },

  mobile : {
    type : String
  },

  grades : {
      type : Array
  }
});


module.exports = mongoose.model('Student', student);
