var express = require('express');

var app = express();

var port = process.env.PORT || 5001;
var bookRouter = express.Router();

// Set up middleware to be used by Express
// Looks in 'public' directory for the related css/js static files (styles.css, etc), then it starts the routes
app.use(express.static('public'));
app.set('views', './src/views');

// EJS - Template engine
app.set('view engine', 'ejs');

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

app.use('/Books', bookRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Yo from render',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

app.get('/books', function(req, res) {
    res.send('Yo books');
});

app.listen(port, function(err) {
    console.log('Running server on port ' + port);
});