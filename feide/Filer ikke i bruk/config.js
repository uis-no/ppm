module.exports = {
  development: {
    app: {
      name: 'Passport SAML strategy example',
      port: process.env.PORT || 3000
    },
    passport: {
      strategy: 'saml',
      saml: {
        path: process.env.SAML_PATH || '/login/callback',
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://idp-test.feide.no/simplesaml/saml2/idp/SSOService.php',
        issuer: 'http://localhost:3000/feide/metadata',
        cert: process.env.SAML_CERT || null
      }
    }
  }
};