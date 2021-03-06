var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); // Passport uses this to parse cookie session
var passport = require('passport'); // Authentication middleware
var session = require('express-session'); // Stores user info

var app = express();

var port = process.env.PORT || 5001;

var nav = [{
    Link: '/books',
    Text: 'Book'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

// Set up middleware to be used by Express
// Looks in 'public' directory for the related css/js static files (styles.css, etc), then it starts the routes
app.use(express.static('public'));
// Check if body coming in is JSON, then it will parse it out and will create a req.body object
app.use(bodyParser.json());
// Same as above but for url encoded bodies
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'})); // secret can be whatever

require('./src/config/passport')(app); // Pulls in that file and execute its contents

app.set('views', './src/views');

// EJS - Template engine
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Yo from render',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }]
    });
});

app.get('/books', function(req, res) {
    res.send('Yo books');
});

app.listen(port, function(err) {
    console.log('Running server on port ' + port);
});