var passport = require('passport');
//var User = require('mongoose').model('User');
var User = require('../model/user.model');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    require('./strategies/google.strategy')();
    // require('./strategies/twitter.strategy')();
    // require('./strategies/linkedin.strategy')();
    // require('./strategies/facebook.strategy')();
};
