const SamlStrategy = require('passport-saml').Strategy;

module.exports = function (passport, config) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new SamlStrategy(
    {
      path: config.passport.saml.path,
      entryPoint: config.passport.saml.entryPoint,
      issuer: config.passport.saml.issuer
    },
    function (profile, done) {
      return done(null,
        {
          id: profile.uid,
          mail: profile.mail,
          displayName: profile.cn,
          firstName: profile.givenName,
          lastName: profile.sn
        });
    })
  );

};