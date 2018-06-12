var passport        = require('passport');
const session       = require('express-session');
var User            = require('../model/user.model');
var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app) {

    //app.use(session({secret : 'anything'}));

    app.use(passport.initialize());
    app.use(passport.session());

    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  In a
    // production-quality application, this would typically be as simple as
    // supplying the user ID when serializing, and querying the user record by ID
    // from the database when deserializing.  However, due to the fact that this
    // example does not have a database, the complete Google/Facebook profile is serialized
    // and deserialized.
    passport.serializeUser(function(user, done) {
        //done(null, userId);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        // find user in database by userId, then call done
        done(null, user);
    });

    require('./strategies/google.strategy')();
    require('./strategies/local.strategy')();

    // require('./strategies/twitter.strategy')();
    // require('./strategies/linkedin.strategy')();
    // require('./strategies/facebook.strategy')();
};
