var http = require('http'); // To make function calls to goodreadsService
var xml2js = require('xml2js'); // Convert XML to JSON
var parser = xml2js.Parser({explicitArray: false});

var goodreadsService = function() {
    var getBookById = function(id, cb) {

        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/656?format=xml&key=BfigJopFIBUqZb58yCmRg'
        };

        var callback = function(response) {
            var str = '';

            response.on('data', function(chunk) {
                str += chunk;
            });
            response.on('end', function() {
                console.log(str);
                parser.parseString(str, function(err, result) {
                    cb(null, result.GoodreadsResponse.book);
                });
            });
        };
        http.request(options, callback).end();
    };

    return {
        getBookById: getBookById
    };
};

module.exports = goodreadsService;