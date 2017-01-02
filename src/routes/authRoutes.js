var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function() {

    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };

                collection.insert(user, function(err, results) {
                    // After sign up, auto login
                    req.login(results.ops[0], function() {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });

    // Sign in - using passport to authenticate user
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
    // If user isn't logged in, redirect to '/'
        .all(function(req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function(req, res) {
            // req.user: how passport lets us know user signed in along with its info
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;