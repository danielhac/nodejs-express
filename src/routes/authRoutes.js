var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function() {

    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            // After sign up, auto login
            req.login(req.body, function() {
                res.redirect('/auth/profile');
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