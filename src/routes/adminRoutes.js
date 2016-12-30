var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'Testing title 1',
        genre: 'I am testing genre 1',
        author: 'Again testing author 1',
        read: false
    },
    {
        title: 'Testing title 2',
        genre: 'I am testing genre 2',
        author: 'Again testing author 2',
        read: false
    }
];

var router = function(nav) {

    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(books,
                    function(err, results) {
                        res.send(results);
                        db.close();
                    }
                );
            });

        });

    return adminRouter;
};

module.exports = router;