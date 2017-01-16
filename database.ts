const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds061196.mlab.com:61196/ppm');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log('connection running'));