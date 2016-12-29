var express = require('express');

var bookRouter = express.Router();

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

bookRouter.route('/')
    .get(function(req, res) {
        res.render('books', {
            title: 'Books',
            nav: [{
                Link: '/Books',
                Text: 'Books'
            }, {
                Link: '/Authors',
                Text: 'Authors'
            }],
            books: books
        });
    });

bookRouter.route('/single')
    .get(function(req, res) {
        res.send('Hello Single Book');
    });

module.exports = bookRouter;