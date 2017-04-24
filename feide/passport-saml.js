var SamlStrategy = require('passport-saml').Strategy;
var saml = require('passport-saml');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var session = require('express-session');

var fs = require('fs');

// TODO: store mail, eduPersonAffiliation, and name if one is found in profile or another easily accessible object

var strategy = new SamlStrategy(
  {
    callbackUrl: 'http://localhost:3000/login/callback',
    entryPoint: 'https://idp-test.feide.no/simplesaml/saml2/idp/SSOService.php',
    issuer: 'http://localhost:3000/feide/metadata',
    logoutUrl: 'https://idp-test.feide.no/simplesaml/saml2/idp/SingleLogoutService.php',
    logoutCallbackUrl: 'http://localhost:3000/logout',
    identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient'
  },

  function(profile, done) {
    router.profile;
    return done(null, profile);
  })

var metadata = strategy.generateServiceProviderMetadata();

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

passport.use(strategy);


router.use(session({
  secret: 'social justice cat',
  resave: false,
  saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());


router.get('/isAuthenticated', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});

// kjøres ikke ved login
router.get('/', function (req, res) {
    console.log("on /: ");
    console.log(req.user);
    if (req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });

  router.get('/user', function (req, res) {
    if (req.isAuthenticated()) {
      //console.log("user is authenticated");
      return res.json(req.user);
    }
  });

// kjøres ved login
router.post('/login/callback',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

// Part of the login process, /login/callback uses this route to redirect to feide's login site
router.get('/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

router.post('/logout', function(req, res) {
  console.log("on logout: ");
  console.log(req.user);
  if (req.isAuthenticated()) {
    strategy.logout(req, function(err, uri) {
      if(!err) {
        req.logout();
        console.log("so far so good?");
        console.log(req.user);
        return res.redirect(uri);
      }
    });
  }
});

/*router.post('/logout/callback', (req, res) => {
  strategy.logout(req, (err, uri) => {
    console.log('on logout/callback');
    console.log(uri);
    res.redirect(uri);
  });
});*/

  module.exports = router;
