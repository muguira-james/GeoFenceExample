//
/*
The routines here are used to place players

The code will place a plyer on a 6 sided template

The top left player is number 1
The top right player is number 2
The middle left player is number 3
The middle right player is number 4
The lower left player is number 5
The lower right player is number 6

OR

The code can use a vertical or horizontal line to place players.

functions
createLayLng is an internal function used to produce a javascript Object
boxCalc is also internal, it adjusts the center point {lat, lng} with a small offset
vline is also internal, it places players along a vertical Line
hline is also internal, it places players along a horizontal line

mapLocationClear clears the holeMapIndex
mapLocationOnHole places the given player around a center
computeZoomOffSet uses the current zoom to create a small number to use as an offset


*/

// createLatLng - internal to this file, returns a {lat, lng}
createLatLng = function(lat, lng) {
  var p2 = "{ \"latitude\": " + lat + ", \"longitude\": " + lng + "}"
  return JSON.parse(p2);
}

//
// 18 holes on a golfcourse
var holeMapIndex = [18];

//
// resets the hole map index back to zero (0)
exports.mapLocationClear = function() {
  for (i=0; i<18; i++) {
    holeMapIndex[i] = {};
    holeMapIndex[i].tee = 0
    holeMapIndex[i].fairway = 0
    holeMapIndex[i].green = 0
  }
}

//
// given a zoomOffSet, a hole number (0-17), a player, and a golfCourse configuration
// compute and place the player on the 6 sided template
//
// limitations:
// 1. the center point for placing a player is the same as the physical location.  For
// example, this code places the players around the flag on the green.  Some times
// you want to place the player slightly away from the flag to improve the display
//
// solution
// create 3 more properties of the golfcourse configuration, teeTemplateCenter,
// fairwayTemplateCenter and GreenTemplateCenter
exports.mapLocationOnHole = function(zoomOffSet, hole, plyr, golfCourse) {

  let coord = {};
  coord.coordinate = {};
  let latlng = null;


  // console.log("mloh: hole->", hole, zoomOffSet, plyr);
  if (plyr.HoleLocation === "TEE") {

    // 1st, create the center point for the template
    coord.coordinate.latitude = golfCourse.Features[hole].properties.teeTemplateCenter.latitude
    coord.coordinate.longitude = golfCourse.Features[hole].properties.teeTemplateCenter.longitude

    // then, place the player.  holeMapIndex.tee counts from 0-2 and fills template
    // locations 0, 1, 2 (top left, top right, middle left)
    switch (golfCourse.Features[hole].properties.teeDrawingPattern) {
      case "vline": {
        latlng = vline(coord.coordinate, zoomOffSet, holeMapIndex[hole].tee)
        break
      }
      case "hline": {
        latlng = hline(coord.coordinate, zoomOffSet, holeMapIndex[hole].tee)
        break
      }
      default: {
        latlng = boxCalc(coord.coordinate, zoomOffSet, holeMapIndex[hole].tee);
        break
      }
    }

    // once you've put somebody in a template slot make the next available
    holeMapIndex[hole].tee += 1
    if (holeMapIndex[hole].tee > 5) {
      holeMapIndex[hole].tee = 0
    }

  } else if ((plyr.HoleLocation === "FWY") || (plyr.HoleLocation === "FWY2")) {
    // center point for the fairway
    coord.coordinate.latitude = golfCourse.Features[hole].properties.fairwayTemplateCenter.latitude
    coord.coordinate.longitude = golfCourse.Features[hole].properties.fairwayTemplateCenter.longitude
    // then, place the player.  holeMapIndex.tee counts from 0-2 and fills template
    // locations 0, 1, 2 (top left, top right, middle left)
    switch (golfCourse.Features[hole].properties.fairwayDrawingPattern) {
      case "vline": {
        latlng = vline(coord.coordinate, zoomOffSet, holeMapIndex[hole].fairway)
        break
      }
      case "hline": {
        latlng = hline(coord.coordinate, zoomOffSet, holeMapIndex[hole].fairway)
        break
      }
      default: {
        latlng = boxCalc(coord.coordinate, zoomOffSet, holeMapIndex[hole].fairway);
        break
      }
    }

    // keep incrementing through the fairway template
    holeMapIndex[hole].fairway += 1
    if (holeMapIndex[hole].fairway > 5) {
      holeMapIndex[hole].fairway = 0
    }
  } else if (plyr.HoleLocation === "GRN") {
    // center point for the green
    coord.coordinate.latitude = golfCourse.Features[hole].properties.greenTemplateCenter.latitude
    coord.coordinate.longitude = golfCourse.Features[hole].properties.greenTemplateCenter.longitude
    // then, place the player.  holeMapIndex.tee counts from 0-2 and fills template
    // locations 0, 1, 2 (top left, top right, middle left)
    switch (golfCourse.Features[hole].properties.greenDrawingPattern) {
      case "vline": {
        latlng = vline(coord.coordinate, zoomOffSet, holeMapIndex[hole].green)
        break
      }
      case "hline": {
        latlng = hline(coord.coordinate, zoomOffSet, holeMapIndex[hole].green)
        break
      }
      default: {
        latlng = boxCalc(coord.coordinate, zoomOffSet, holeMapIndex[hole].green);
        break
      }
    }
    holeMapIndex[hole].green += 1
    if (holeMapIndex[hole].green > 5) {
      holeMapIndex[hole].green = 0
    }
  } else {
    console.log("Error: mapLocationOnHole: holeLocation is not in { tee, fairway, green }", plyr.HoleLocation)
    coord.coordinate.latitude = 0.0;
    coord.coordinate.longitude = 0.0;
    latlng = boxCalc(coord.coordinate, zoomOffSet, holeMapIndex[hole].tee);
  }

  // return the final location for a given player
  // console.log("play draw-->", latlng)
  return latlng;
}

//
// place players along a horizontal line
hline = function(centerPoint, zoomOffSet, index) {
  var line = [];
  var lat = 0
  var lng = 0

  // console.log("hz=", centerPoint, zoomOffSet)
  if (centerPoint === null) return 0
  if (zoomOffSet === null) return 0

  if (index === 0) {
    lat = centerPoint.latitude
    lng = centerPoint.longitude - zoomOffSet

    return createLatLng(lat, lng)
  }

  if (index === 1) {
    lat = centerPoint.latitude
    lng = centerPoint.longitude

    return createLatLng(lat, lng)
  }

  if (index === 2) {
    lat = centerPoint.latitude
    lng = centerPoint.longitude + zoomOffSet

    return createLatLng(lat, lng)
  }

  if (index === 3) {
    lat = centerPoint.latitude
    lng = centerPoint.longitude + (2 * zoomOffSet)

    return createLatLng(lat, lng)
  }

  if (index === 4) {
    lat = centerPoint.latitude
    lng = centerPoint.longitude + (zoomOffSet * 3)

    return createLatLng(lat, lng)
  }

  if (index === 5) {
    lat = centerPoint.latitude
    lng = centerPoint.longitude + (zoomOffSet * 4)

    return createLatLng(lat, lng)
  }
}

//
// place players along a vertical line
vline = function(centerPoint, zoomOffSet, index) {
  var line = [];
  var lat = 0
  var lng = 0

  // console.log("vz=", centerPoint, zoomOffSet)
  if (centerPoint === null) return 0
  if (zoomOffSet === null) return 0

  if (index === 0) {
    lat = centerPoint.latitude - zoomOffSet
    lng = centerPoint.longitude

    return createLatLng(lat, lng)
  }

  if (index === 1) {
    lat = centerPoint.latitude
    lng = centerPoint.longitude

    return createLatLng(lat, lng)
  }

  if (index === 2) {
    lat = centerPoint.latitude + zoomOffSet
    lng = centerPoint.longitude

    return createLatLng(lat, lng)
  }

  if (index === 3) {
    lat = centerPoint.latitude + (zoomOffSet * 2)
    lng = centerPoint.longitude

    return createLatLng(lat, lng)
  }

  if (index === 4) {
    lat = centerPoint.latitude + (zoomOffSet * 3)
    lng = centerPoint.longitude

    return createLatLng(lat, lng)
  }

  if (index === 5) {
    lat = centerPoint.latitude + (zoomOffSet * 4)
    lng = centerPoint.longitude

    return createLatLng(lat, lng)
  }

}

//
// return a (lat, lng) slightly displaced, by zoomOffSet, from the centerPoint
// index is the location in the template for this (lat, lng) (0-5)
boxCalc = function(centerPoint, zoomOffSet, index) {
  var box = [];
  let fudgeFactor = 0

  // console.log("bz=", centerPoint, zoomOffSet)
  if (centerPoint === null) return 0;
  if (zoomOffSet === null) return 0;

  // console.log("sz=", centerPoint, zoomOffSet)

  // assumes the centerPoint is a (Lat, Lng) object
  if (index === 0) {
    var lat = centerPoint.latitude + zoomOffSet + fudgeFactor;
    var lng = centerPoint.longitude - zoomOffSet;

    //  console.log("T=", p1, lat, lng, p2);
    return createLatLng(lat, lng);
  }

  if (index === 1) {
    var lat = centerPoint.latitude + zoomOffSet;
    var lng = centerPoint.longitude + zoomOffSet;

    //  console.log("T=", lat, lng, p2);
    return createLatLng(lat, lng);
  }
  if (index === 2) {
    var lat = centerPoint.latitude;
    var lng = centerPoint.longitude - zoomOffSet;

    //  console.log("T=", lat, lng, p2);
    return createLatLng(lat, lng);
  }
  if (index === 3) {
    var lat = centerPoint.latitude;
    var lng = centerPoint.longitude + zoomOffSet;

    //  console.log("T=", lat, lng, p2);
    return createLatLng(lat, lng);
  }
  if (index === 4) {
    var lat = centerPoint.latitude - zoomOffSet;
    var lng = centerPoint.longitude - zoomOffSet;

    //  console.log("T=", lat, lng, p2);
    return createLatLng(lat, lng);
  }
  if (index === 5) {
    var lat = centerPoint.latitude - zoomOffSet;
    var lng = centerPoint.longitude + zoomOffSet;

    //  console.log("T=", lat, lng, p2);
    return createLatLng(lat, lng);
  }
  console.log("WTF: boxCalc: i was given an index > 5???", index)
  // return new window.google.maps.LatLng(0.0, 0.0);
}

//
// using the react native extent: { latitide, longitude, latitudeDelta, longitudeDelta}
// compute the right offset to be used to fine tune player positions
exports.computeZoomOffSet = function(e) {
  let offset = 0.0005;
  // console.log("r ->", e)
  if (e === null) return offset;

  // console.log("->", e.latitude, e.longitude)

  if (e.longitudeDelta <= 0.0009) {
    // console.log("zoom changed: 20", e.longitudeDelta)
    offset = 0.00006;
  }
  if ((e.longitudeDelta >= 0.0009) && (e.longitudeDelta < 0.0010)) {
    // console.log("zoom changed: 19", e.longitudeDelta)
    offset = 0.00008;
  }
  if ((e.longitudeDelta >= 0.0010) && (e.longitudeDelta < 0.0011)) {
    // console.log("zoom changed: 18", e.longitudeDelta)
    offset = 0.00009;
  }
  if ((e.longitudeDelta >= 0.0011) && (e.longitudeDelta < 0.0012)) {
    // console.log("zoom changed: 17", e.longitudeDelta)
    offset = 0.0001;
  }
  if ((e.longitudeDelta >= 0.0012) && (e.longitudeDelta < 0.0013)) {
    // console.log("zoom changed: 16", e.longitudeDelta)
    offset = 0.0001;
  }
  if ((e.longitudeDelta >= 0.0013) && (e.longitudeDelta <= 0.0014)) {
    // console.log("zoom changed: 15", e.longitudeDelta)
    offset = 0.00012
  }
  if ((e.longitudeDelta >= 0.0014) && (e.longitudeDelta <= 0.0015)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00013
  }
  if ((e.longitudeDelta >= 0.0015) && (e.longitudeDelta <= 0.0016)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00013
  }
  if ((e.longitudeDelta >= 0.0016) && (e.longitudeDelta <= 0.0017)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00014
  }
  if ((e.longitudeDelta >= 0.0017) && (e.longitudeDelta <= 0.0018)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00014
  }
  if ((e.longitudeDelta >= 0.0018) && (e.longitudeDelta <= 0.0019)) {
    console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00015
  }
  if ((e.longitudeDelta >= 0.0019) && (e.longitudeDelta <= 0.0020)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00015
  }
  if ((e.longitudeDelta >= 0.0020) && (e.longitudeDelta <= 0.0021)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00015
  }
  if ((e.longitudeDelta >= 0.0021) && (e.longitudeDelta <= 0.0022)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00016
  }
  if ((e.longitudeDelta >= 0.0022) && (e.longitudeDelta <= 0.0023)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00016
  }
  if ((e.longitudeDelta >= 0.0023) && (e.longitudeDelta <= 0.0024)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00016
  }
  if ((e.longitudeDelta >= 0.0024) && (e.longitudeDelta <= 0.0025)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00016
  }
  if ((e.longitudeDelta >= 0.0025) && (e.longitudeDelta <= 0.0026)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00017
  }
  if ((e.longitudeDelta >= 0.0026) && (e.longitudeDelta <= 0.0027)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00022
  }
  if ((e.longitudeDelta >= 0.0027) && (e.longitudeDelta <= 0.0028)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00045
  }
  if ((e.longitudeDelta >= 0.0028) && (e.longitudeDelta <= 0.0029)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00047
  }
  if ((e.longitudeDelta >= 0.0029) && (e.longitudeDelta <= 0.0030)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00049
  }
  if ((e.longitudeDelta >= 0.0030) && (e.longitudeDelta <= 0.0031)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00051
  }
  if ((e.longitudeDelta >= 0.0031) && (e.longitudeDelta <= 0.0032)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00053
  }
  if ((e.longitudeDelta >= 0.0032) && (e.longitudeDelta <= 0.0033)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00055
  }
  if ((e.longitudeDelta >= 0.0033) && (e.longitudeDelta <= 0.0034)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00057
  }
  if ((e.longitudeDelta >= 0.0034) && (e.longitudeDelta <= 0.0035)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00059
  }
  if ((e.longitudeDelta >= 0.0035) && (e.longitudeDelta <= 0.0036)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00061
  }
  if ((e.longitudeDelta >= 0.0036) && (e.longitudeDelta <= 0.0037)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00060
  }






  if ((e.longitudeDelta >= 0.0037) && (e.longitudeDelta <= 0.0038)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00055
  }
  if ((e.longitudeDelta >= 0.0038) && (e.longitudeDelta <= 0.0039)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00057
  }
  if ((e.longitudeDelta >= 0.0039) && (e.longitudeDelta <= 0.0040)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00059
  }
  if ((e.longitudeDelta >= 0.0040) && (e.longitudeDelta <= 0.0041)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00061
  }
  if ((e.longitudeDelta >= 0.0041) && (e.longitudeDelta <= 0.0042)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00063
  }
  if ((e.longitudeDelta >= 0.0042) && (e.longitudeDelta <= 0.0043)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00065
  }
  if ((e.longitudeDelta >= 0.0043) && (e.longitudeDelta <= 0.0044)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00067
  }
  if ((e.longitudeDelta >= 0.0044) && (e.longitudeDelta <= 0.0045)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00069
  }
  if ((e.longitudeDelta >= 0.0045) && (e.longitudeDelta <= 0.0046)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00071
  }
  if ((e.longitudeDelta >= 0.0046) && (e.longitudeDelta <= 0.0047)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00078
  }
  if ((e.longitudeDelta >= 0.0047) && (e.longitudeDelta <= 0.0048)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00082
  }
  if ((e.longitudeDelta >= 0.0048) && (e.longitudeDelta <= 0.0049)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00084
  }
  if ((e.longitudeDelta >= 0.0049) && (e.longitudeDelta <= 0.0050)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00086
  }


  if ((e.longitudeDelta >= 0.0050) && (e.longitudeDelta <= 0.0051)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00046
  }
  if ((e.longitudeDelta >= 0.0051) && (e.longitudeDelta <= 0.0052)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00047
  }
  if ((e.longitudeDelta >= 0.0052) && (e.longitudeDelta <= 0.0053)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00048
  }
  if ((e.longitudeDelta >= 0.0053) && (e.longitudeDelta <= 0.0054)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00049
  }
  if ((e.longitudeDelta >= 0.0054) && (e.longitudeDelta <= 0.0055)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00050
  }
  if ((e.longitudeDelta >= 0.0055) && (e.longitudeDelta <= 0.0056)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00052
  }
  if ((e.longitudeDelta >= 0.0056) && (e.longitudeDelta <= 0.0057)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00053
  }
  if ((e.longitudeDelta >= 0.0057) && (e.longitudeDelta <= 0.0058)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00054
  }
  if ((e.longitudeDelta >= 0.0058) && (e.longitudeDelta <= 0.0059)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00055
  }
  if ((e.longitudeDelta >= 0.0059) && (e.longitudeDelta <= 0.0060)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00055
  }
  if ((e.longitudeDelta >= 0.0060) && (e.longitudeDelta <= 0.0061)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00056
  }

  if ((e.longitudeDelta >= 0.0061) && (e.longitudeDelta <= 0.0062)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00057
  }
  if ((e.longitudeDelta >= 0.0062) && (e.longitudeDelta <= 0.0063)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00058
  }
  if ((e.longitudeDelta >= 0.0063) && (e.longitudeDelta <= 0.0064)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00059
  }
  if ((e.longitudeDelta >= 0.0064) && (e.longitudeDelta <= 0.0065)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00060
  }
  if ((e.longitudeDelta >= 0.0065) && (e.longitudeDelta <= 0.0066)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00061
  }
  if ((e.longitudeDelta >= 0.0066) && (e.longitudeDelta <= 0.0067)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00062
  }
  if ((e.longitudeDelta >= 0.0067) && (e.longitudeDelta <= 0.0068)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00063
  }
  if ((e.longitudeDelta >= 0.0068) && (e.longitudeDelta <= 0.0069)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00064
  }
  if ((e.longitudeDelta >= 0.0069) && (e.longitudeDelta <= 0.0070)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00065
  }
  if ((e.longitudeDelta >= 0.0070) && (e.longitudeDelta <= 0.0071)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00066
  }
  if ((e.longitudeDelta >= 0.0071) && (e.longitudeDelta <= 0.0072)) {
    // console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00067
  }

  return offset
}
