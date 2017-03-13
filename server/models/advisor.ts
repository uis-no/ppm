var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var advisor = new Schema({
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
  }
});


module.exports = mongoose.model('Advisor', advisor);
