var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    passport.use(new LocalStrategy({
        userNameField: 'userName',
        passwordField: 'password'
    },
    // Determines if credentials are correct
    function(username, password, done) {
        // Testing before actual authentication
        var user = {
            username: username,
            password: password
        };
        done(null, user);
    }));
};