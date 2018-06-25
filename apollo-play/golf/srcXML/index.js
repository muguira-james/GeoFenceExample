var fetch = require('node-fetch')
var parser = require('xml2json')

var url = 'http://services.lpgascoring.com/ws/1.5/locatorboards/players?clientId=70874eab-b701-47bb-be91-a42b2cb70da6'

fetch(url)
    .then(res => res.text())
    .then(res =>  parser.toJson(res))
    .then(res => console.log(JSON.parse(res).GolfDataFeed.Locatorboard.Player))

