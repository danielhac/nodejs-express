var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
// var objectId = require('mongodb').ObjectID;

var router = function(nav) {
    var bookService = require('../services/goodreadsService')();
    var bookController = require('../controllers/bookController')(bookService, nav);

    // If user isn't logged in, do not allow access
    bookRouter.use(bookController.verifyUser);

    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getById);

    return bookRouter;
};

module.exports = router;