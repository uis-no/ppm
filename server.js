// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
var url = 'mongodb://admin:admin@ds061196.mlab.com:61196/ppm';

// Get our routes
const api = require('./server/routes/api');
//const routes = require('./feide/index'); // Feide
//const sso = require('./feide/sso'); // Feide
const routes = require('./feide/passport-saml');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

var db = mongoose.connect(url, (err) => {
  if (err) {
    console.log('Could not connect to database. Reason: ');
    console.log(err);
  }
  console.log('Connected to database!');
});

// Set our routes
app.use('/api', api);
//app.use('/', routes);
//app.use('/sso', sso);
app.use('/', routes);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
