var express = require('express');
var router = express.Router();

var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var session = require('express-session');

var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN || 'jarida.eu.auth0.com',
    clientID:     process.env.AUTH0_CLIENT_ID || '1QKH2NdD18m2ddQ5kXCzDuJeYTdQk1eA',
    clientSecret: process.env.AUTH0_CLIENT_SECRET || 'supersecretauth0warrior',
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



//router.use(passport.initialize());
//router.use(passport.session());


router.get('/isAuthenticated', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});

router.get('/', (req, res) => {
  if(req.isAuthenticated()) {
    res.render('/projects', {
      user: req.user
    });
  }
});

router.get('/login', (req, res) => {
  passport.authenticate('auth0', { failureRedirect: '/' }, (req, res) => {
    res.redirect('/');
  });
});

router.post('/login/callback',
  passport.authenticate('auth0', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  req.redirect('/');
});

router.get('/callback', (req, res) => {
  passport.authenticate('auth0', { failureRedirect: '/'}, (req,res) => {
    res.redirect('/');
  })
});

module.exports = router;
