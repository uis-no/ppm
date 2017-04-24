var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ext_examiner = new Schema({

  _id : String,

  name : String,

  mail : String,

  mobile : String

});


module.exports = mongoose.model('Ext_examiner', ext_examiner);
