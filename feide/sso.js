var saml = require('express-saml2');
var express = require('express');
var router = express.Router();

var idp = saml.IdentityProvider('/Users/mariusjakobsen/Desktop/Bachelor-oppgave/feide/metadata/idp.xml');
var sp = saml.ServiceProvider('/Users/mariusjakobsen/Desktop/Bachelor-oppgave/feide/metadata/sp.xml');

router.get('/metadata', function(req, res, next) {
    res.header('Content-Type','text/xml').send(sp.getMetadata());
});

router.get('/spinitsso-redirect', function(req, res) {
    sp.sendLoginRequest(idp,'redirect',function(url) {
        res.redirect(url);
    });
});

router.post('/acs', function(req, res, next) {
    sp.parseLoginResponse(idp, 'post', req, function(parseResult) {
        // Use the parseResult can do customized action
    res.send('Validate the SAML Response successfully !');
    });
});

router.post('/slo',function(req, res){
    sp.parseLogoutRequest(idp, 'post', req, function(parseResult) {
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