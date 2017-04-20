var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({}, { strict: false, collection: 'fs.files' });


module.exports = mongoose.model('File', FileSchema);
