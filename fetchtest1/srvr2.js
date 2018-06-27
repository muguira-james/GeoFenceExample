
fs = require('fs');
http = require('http');
url = require('url');

var cntr = 1;
var z = {
  "GolfDataFeed":
  {
    "Type":"Locatorboards",
    "Timestamp":"5/17/2018 6:03:39 PM",
    "Tournament":
    {
      "Locatorboard":
      {
        "Player":
        [
          {
            "HoleLocation":"TEE",
            "Status":"InProgress",
            "Hole":9,
            "StartTee":10,
            "FirstName":"Dorsey",
            "StartTime":"09:16",
            "Country":"USA",
            "ID":99203,
            "LastName":"Addicks",
            "Course":"Ki"
          },
          {"HoleLocation":"FWY","Status":"InProgress","Hole":3,"StartTee":1,"FirstName":"Marina","StartTime":"13:27","Country":"USA","ID":98011,"LastName":"Alex","Course":"Ki"},
          {"HoleLocation":"TEE","Status":"InProgress","Hole":3,"StartTee":1,"FirstName":"Rebecca","StartTime":"13:38","Country":"AUS","ID":98276,"LastName":"Artis","Course":"Ki"},
          {"HoleLocation":"TEE","Status":"InProgress","Hole":7,"StartTee":1,"FirstName":"Celine","StartTime":"12:32","Country":"FRA","ID":98355,"LastName":"Boutier","Course":"Ki"},
        ]
      }
    }
  }
}



console.log("server on 5000")
http.createServer(function(req, res){
  var request = url.parse(req.url, true);
  var action = request.pathname;

  if (action == '/player') {
     var img = fs.readFileSync('./assets/player.png');
     res.writeHead(200, {'Content-Type': 'image/png' });
     res.end(img, 'binary');
  } else if (action === '/active') {
    console.log("hit=",cntr)
    cntr += 1;
    var fileName = "data.json"
    console.log("file name=", fileName)
    var raw = fs.readFileSync(fileName, 'utf8');
    // let someText = raw.replace(/(\r\n\t|\n|\r\t)/gm,"");
    // var zzz = JSON.parse(someText)
    // console.log(zzz)
    // var js = "{ hello: 1 }"
    // console.log(js)
    res.writeHead(200, {'Content-Type': 'application/json' });
    res.end(raw, 'binary');

  } else {
     res.writeHead(200, {'Content-Type': 'text/plain' });
     res.end('Hello World \n');
  }
}).listen(5000, '127.0.0.1');
