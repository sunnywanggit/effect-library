var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var routes = {
    '/submit': function (req, res) {
        var pathObj = url.parse(req.url, true);
        res.writeHead(200, 'OK');
        res.write('<span>你的名字是 ' + req.body['name'] + '</span><br>')
        res.write('<span>Your age is ' + req.body['age'] + '</span>');
        res.write('<br><a href="index.html">go back</a>');
        return res.end();
    }

}
function staticRoot(staticPath, req, res) {
	var pathObj = url.parse(req.url, true);
	if(pathObj.pathname === '/') {
		pathObj.pathname += 'index.html';
	}

	var filePath = path.join(staticPath, pathObj.pathname);

	fs.readFile(filePath, 'binary', function(err, fileContent){
		if(err) {
			res.writeHead(404, 'not found');
			// TODO 这里可以专门画个404的页面
			return res.end('<h1>404 Not Found</h1>');
		}else {
			console.log('ok');
			res.writeHead(200, 'OK');
			res.write(fileContent, 'binary');
			res.end();
		}
	})
}


var server = http.createServer(function (req, res) {
    var pathObj = url.parse(req.url, true);
    var handleFn = routes[pathObj.pathname];
    if(handleFn !== undefined) {
        res.setHeader('Content-Type','text/html;charset=utf-8');
        req.query = pathObj.query;
        var body = '';
        req.on('data', function (chunk) {
            body += chunk;
        }).on('end', function () {
            req.body = parseBody(body);
            handleFn(req, res);
        })
    }else {
        staticRoot(__dirname, req, res);
    }
})

function parseBody(body) {
    console.log('body: ' + body);
    var obj = {};
    body.split('&').forEach(function (value) {
        obj[value.split('=')[0]] = value.split('=')[1];
    })
    return obj;

}

console.log('start listen port 8082');
server.listen(8082);