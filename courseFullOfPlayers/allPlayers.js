// -----------------
var fs = require('fs')
var raw = fs.readFileSync('score.json')
var zzz = JSON.parse(raw)
var playerDrawingUtils = require("./PlayerDrawingUtils.js");
var golfCourse = require("./shoprite.json");
// var a = {}

// console.log(zzz.GolfDataFeed.Tournament.Locatorboard.Player)
// zzz.GolfDataFeed.Tournament.Leaderboard.Player.forEach(p => {
//   a[p.ID] += 1
//
// })
// Object.keys(a).forEach(i => {
//   if (a[i] > 1) {
//     console.log("err->", a[i])
//   }
// })
// console.log(Object.keys(a).length)

const region = {
  latitude: golfCourse.initialRegion.latitude,
  longitude: golfCourse.initialRegion.longitude,
  latitudeDelta: 0.0003,
  longitudeDelta: 0.0025
};

playerDrawingUtils.mapLocationClear();

let zOffSet = playerDrawingUtils.computeZoomOffSet(region);

;

var hole = 1
var loc = "TEE"
var cnt = 0
var plyr = []
zzz.GolfDataFeed.Tournament.Leaderboard.Player.forEach(p => {
// zzz.GolfDataFeed.Tournament.Locatorboard.Player.forEach((p, index) => {
// for (ii = 0; ii<7; ii++) {
  // p = zzz.GolfDataFeed.Tournament.Leaderboard.Player[ii]
  if (cnt <= 2) {
    p.Hole = hole
    p.HoleLocation = loc
  } else if (cnt <= 5){
    loc = "FWY"
    p.Hole = hole
    p.HoleLocation = loc
  } else if (cnt <= 8) {
    loc = "GRN"
    p.Hole = hole
    p.HoleLocation = loc
  } else {
    cnt = 0
    hole += 1
    loc = "TEE"
    p.Hole = hole
    p.HoleLocation = loc
  }
  cnt++
  let b = playerDrawingUtils.mapLocationOnHole(
    zOffSet,
    p.Hole,
    p,
    golfCourse
  )
  p.coordinate = b
  plyr.push(p)
})
zzz.GolfDataFeed.Tournament.Leaderboard.Player = plyr

// zzz.GolfDataFeed.Tournament.Locatorboard.Player = plyr
console.log(JSON.stringify(zzz, null, 2))
// console.log("h=", hole, "loc=", loc, "cnt=",cnt)
// -----------------
