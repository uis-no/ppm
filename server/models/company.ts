var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var company = new Schema({

  _id : String,

  name : String,

  mail : String,

  mobile : String

});


module.exports = mongoose.model('Company', company);
