var SamlStrategy = require('passport-saml').Strategy;
var saml = require('passport-saml');
var express = require('express');
var router = express.Router();
var passport = require('passport');

export class PassportSAML {

    strategy = new SamlStrategy(
        {
            callbackUrl: 'http://localhost:3000/login/callback',
            entryPoint: 'https://idp-test.feide.no/simplesaml/saml2/idp/SSOService.php',
            issuer: 'http://localhost:3000/feide/metadata',
            logoutUrl: 'https://idp-test.feide.no/simplesaml/saml2/idp/SingleLogoutService.php',
            logoutCallbackUrl: 'http://localhost:3000/logout',
            identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient'
        },

/*  module.exports.Profile = (profile, done) => { 
      return done(null, profile);
  } );*/
  
    function(profile, done) {
        //exports.user = profile.mail;
        //module.exports.profile;
        console.log(profile);
        router.profile;
        return done(null, profile);
    })

    metadata = this.strategy.generateServiceProviderMetadata();

    passport.serializeUser(user, done) {
    done(null, user);
  };

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

passport.use(strategy);

router.use(passport.initialize());

// kjøres ikke ved login
router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('posts.component.ts',
        {
          user: req.user
        });
    } 
  });

// kjøres ved login
router.post('/login/callback',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

// kjøres ikke ved login
router.get('/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function(req, res) {
  return strategy.logout(req, function(err, uri) {
    return res.redirect(uri);
  });
});

}