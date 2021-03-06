var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'War and Peace',
        genre: '',
        author: 'Lev Nikolayevich Tolstoy',
        bookId: 656,
        read: false
    },
    {
        title: 'Les Miserables',
        genre: '',
        author: 'Historical Fiction',
        bookId: 24280,
        read: false
    },
    {
        title: 'Fullstack React: The Complete Book on ReactJS',
        genre: '',
        author: 'Anthony Accomazzo',
        bookId: 32705383,
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