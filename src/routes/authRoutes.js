var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

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

    authRouter.route('/profile')
        .get(function(req, res) {
            // req.user: how passport lets us know user signed in along with its info
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;