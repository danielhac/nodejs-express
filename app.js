var express = require('express');

var app = express();

var port = 5001;

// Set up middleware to be used by Express
// Looks in 'public' directory for the related css/js static files (styles.css, etc), then it starts the routes
app.use(express.static('public'));
app.use(express.static('src/views'));


app.get('/', function(req, res) {
    res.send('Yo World');
});

app.get('/books', function(req, res) {
    res.send('Yo books');
});

app.listen(port, function(err) {
    console.log('Running server on port ' + port);
});