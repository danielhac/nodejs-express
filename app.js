var express = require('express');

var app = express();

var port = 5001;

app.get('/', function(req, res) {
    res.send('Yo World');
});

app.get('/books', function(req, res) {
    res.send('Yo books');
});

app.listen(port, function(err) {
    console.log('Running server on port ' + port);
});