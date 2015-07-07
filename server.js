var fs = require('fs'),
    http = require('http');

var PATH_TO_PUBLIC = __dirname + '/public';

http.createServer(function (req, res) {
    var url = req.url;
    if (url === '/') {
        url = '/index.html';
    }

    fs.readFile(PATH_TO_PUBLIC + url, function (err,data) {
        if (err) {
            res.writeHead(404);
            res.end('File not found.');
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(8080);
console.log('listen localhost:8080');