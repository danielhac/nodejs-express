var passport = require('passport');

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user); // Instead of 'err', using 'null' until error checking implemented
    });

    passport.deserializeUser(function (user, done) {
        done(null, user); // Instead of 'err', using 'null' until error checking implemented
    });

    require('./strategies/local.strategy')();
};