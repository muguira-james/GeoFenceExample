
fs = require('fs');
http = require('http');
url = require('url');


http.createServer(function(req, res){
  var request = url.parse(req.url, true);
  var action = request.pathname;
  console.log("action =", action)
  let img = ''
  switch(action) {
    case '/playerBROOKE' : {
      img = fs.readFileSync('./assets/playericons/BROOKE-HENDERSON-ICON.png');
      break;
    }
    case '/playerIN': {
      img = fs.readFileSync('./assets/playericons/IN-KYUNGKIM-ICON.png');
      break;
    }
    case '/playerLEX': {
      img = fs.readFileSync('./assets/playericons/LEXI-THOMPSON-ICON.png');
      break;
    }
    case '/playerMI': {
      img = fs.readFileSync('./assets/playericons/MI-JUNGHUR-ICON.png');
      break;
    }

    case '/playerSO': {
      img = fs.readFileSync('./assets/playericons/SO-YEONRYU-ICON.png');
      break;
    }
    case '/playerSUNG': {
      img = fs.readFileSync('./assets/playericons/SUNG-HYUNPARK-ICON.png');
      break;
    }
    default: {

    }
  }
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img, 'binary');


}).listen(8080, '127.0.0.1');
