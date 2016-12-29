var express = require('express');

var app = express();

var port = process.env.PORT || 5001;

// Set up middleware to be used by Express
// Looks in 'public' directory for the related css/js static files (styles.css, etc), then it starts the routes
app.use(express.static('public'));
app.set('views', './src/views');

// EJS - Template engine
app.set('view engine', 'ejs');

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