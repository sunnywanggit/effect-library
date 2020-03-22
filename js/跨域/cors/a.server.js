var http = require('http');
var path = require('path');
var url = require('url');

var server = http.createServer(function (req, res) {
    var pathObj = url.parse(req.url, true);
    console.log(pathObj);
    // res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:8080');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.writeHead(200, 'OK');
    res.write('Successful');
    res.end();
})
server.listen(9090);
console.log('server started');