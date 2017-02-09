var SamlStrategy = require('passport-saml').Strategy;
var saml = require('passport-saml');
var express = require('express');
var router = express.Router();
var passport = require('passport');

var strategy = new SamlStrategy(
  {
    callbackUrl: 'http://localhost:3000/login/callback',
    entryPoint: 'https://idp-test.feide.no/simplesaml/saml2/idp/SSOService.php',
    issuer: 'http://localhost:3000/feide/metadata',
    logoutUrl: 'https://idp-test.feide.no/simplesaml/saml2/idp/SingleLogoutService.php',
    logoutCallbackUrl: 'http://localhost:3000/logout'
  },
  function(profile, done) {
    exports.user = profile;
    return done(null, profile);
  })

var metadata = strategy.generateServiceProviderMetadata();
// console.log(metadata);

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

passport.use(strategy);

router.use(passport.initialize());

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('posts.component.ts',
        {
          user: req.user
        });
    } 
  });

  router.get('/projects', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('posts.component.ts',
        {
          user: req.user
        });
    } 
  });

router.post('/login/callback',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    console.log(req);
    res.redirect('/');
  }
);

router.get('/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    console.log(req);
    res.redirect('/');
  }
);

router.get('/logout', function(req, res) {
  if (req.user == null) {
    return res.redirect('/');
  }
  return strategy.logout(req, function(err, uri) {
    return res.redirect(uri);
  });
});

  module.exports = router;