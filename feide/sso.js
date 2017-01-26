var saml = require('express-saml2');
var express = require('express');
var router = express.Router();

var spSetting = {
    entityID:'http://localhost:3000/feide/metadata',
    assertionConsumerService:[{
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
        Location: 'http://localhost:3000/sso/acs'
    }],
    singleLogoutService:[{
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
        Location: 'http://localhost:3000/sso/slo'
    }]
};

var idp = saml.IdentityProvider('/Users/mariusjakobsen/Desktop/Bachelor-oppgave/feide/metadata/idp.xml');
var sp = saml.ServiceProvider(spSetting);

sp.exportMetadata('/Users/mariusjakobsen/Desktop/Bachelor-oppgave/feide/metadata/sp_md.xml');

router.get('/metadata', function(req, res, next) {
    res.header('Content-Type','text/xml').send(sp.getMetadata());
});

router.get('/spinitsso-redirect', function(req, res) {
    sp.sendLoginRequest(idp,'redirect',function(url) {
        res.redirect(url);
    });
});

router.post('/acs', function(req, res, next) {
    sp.parseLoginResponse(idp, 'redirect', req, function(parseResult) {
        // Use the parseResult can do customized action
    res.send('Validate the SAML Response successfully !');
    });
});

router.post('/slo',function(req, res){
    sp.parseLogoutRequest(idp, 'redirect', req, function(parseResult) {
        // Check before logout
        req.logout();
        sp.sendLogoutResponse(idp, parseResult, 'redirect', req.body.RelayState, function(url) {
            res.redirect(url);
        });
    });
});

router.get('/slo', function(req, res) {
    sp.parseLogoutResponse(idp, 'redirect', req, function(parseResult) {
        // Check before logout
        req.logout();
        sp.sendLogoutResponse(idp, parseResult, 'redirect', req.query.RelayState, function(url) {
            res.redirect(url);
        });
    });
});

module.exports = router;