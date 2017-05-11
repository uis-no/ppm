var config = require('./config/config.js');
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

var url = process.env.MONGDBURL || config.db.connection;



// Get our routes
const api = require('./server/routes/api');
const routes = require('./feide/passport-saml');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

mongoose.Promise = global.Promise;
var db = mongoose.connect(url, { server: { socketOptions: {auto_reconnect: true, connectTimeoutMS: 3000}}}, (err) => {
  if (err) {
    console.log('Could not connect to database. Reason: ');
    console.log(err);
  }
  console.log('Connected to database!');
  //const parser = require('./server/parser.ts');
  //const ranking = require('./server/ranking.ts');
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose connection disconnected');
});
mongoose.connection.on('error', (err) => {
  console.log('mongoose connection experienced an error,\n ' + err);
});
mongoose.connection.on('open', () => {
  console.log('mongoose connection has been opened');
});

var gracefulExit = () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection disconnected because app was terminated");
    process.exit(0);
  });
}
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

// Set our routes
app.use('/', routes);
app.use('/api', api);


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
