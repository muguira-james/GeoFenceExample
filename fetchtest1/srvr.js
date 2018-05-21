
fs = require('fs');
http = require('http');
url = require('url');


console.log("server on 5000")
http.createServer(function(req, res){
  var request = url.parse(req.url, true);
  var action = request.pathname;

  if (action == '/player') {
     var img = fs.readFileSync('./assets/player.png');
     res.writeHead(200, {'Content-Type': 'image/png' });
     res.end(img, 'binary');
  } else if (action === '/active') {
    var img = fs.readFileSync('data.json');
    res.writeHead(200, {'Content-Type': 'application/json' });
    res.end(img, 'binary');
  } else {
     res.writeHead(200, {'Content-Type': 'text/plain' });
     res.end('Hello World \n');
  }
}).listen(5000, '127.0.0.1');
