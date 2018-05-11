//
createLatLng = function(lat, lng) {
  var p2 = "{ \"latitude\": " + lat + ", \"longitude\": " + lng + "}"
  return JSON.parse(p2);
}
//
var holeMapIndex = [18];

exports.mapLocationClear = function() {
  for (i=0; i<18; i++) {

    // console.log("i=", i);
    holeMapIndex[i] = 0;
  }
}

exports.mapLocationOnHole = function(zoomOffSet, hole, plyr, golfCourse) {

  let coord = {};
  coord.coordinate = {};

  let i = holeMapIndex[hole];
  console.log("mloh: hole->", hole, i);
  if (plyr.locationOnHole === "tee") {
    coord.coordinate.latitude = golfCourse.Features[hole].properties.TeeLocation.lat
    coord.coordinate.longitude = golfCourse.Features[hole].properties.TeeLocation.lng
    holeMapIndex[hole] += 1
    if (holeMapIndex[hole] > 2) {
      holeMapIndex[hole] = 0
    }
  } else if (plyr.locationOnHole === "fairway") {
    coord.coordinate.latitude = golfCourse.Features[hole].properties.labelLocation.lat
    coord.coordinate.longitude = golfCourse.Features[hole].properties.labelLocation.lng
    holeMapIndex[hole] += 1
    if (holeMapIndex[hole] > 2) {
      holeMapIndex[hole] = 0
    }
  } else if (plyr.locationOnHole === "green") {
    coord.coordinate.latitude = golfCourse.Features[hole].properties.FlagLocation.lat
    coord.coordinate.longitude = golfCourse.Features[hole].properties.FlagLocation.lng
    holeMapIndex[hole] += 1
    if (holeMapIndex[hole] > 2) {
      holeMapIndex[hole] = 0
    }
  }
  let latlng = boxCalc(coord.coordinate, zoomOffSet, i);

  return latlng;
}

boxCalc = function(centerPoint, zoomOffSet, index) {
  var box = [];

  if (centerPoint === null) return 0;
  if (zoomOffSet === null) return 0;

  // console.log("sz=", centerPoint, zoomOffSet)

  // assumes the centerPoint is a (Lat, Lng) object
  if (index === 0) {
    var lat = centerPoint.latitude + zoomOffSet;
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
exports.computeZoomOffSet = function(e) {
  let offset = 0.0005;

  if (e === null) return offset;

  // console.log("->", e.latitude, e.longitude)

  if (e.longitudeDelta <= 0.0009) {
    console.log("zoom changed: 20", e.longitudeDelta)
    offset = 0.00009;
  }
  if ((e.longitudeDelta > 0.0009) && (e.longitudeDelta < 0.0013)) {
    console.log("zoom changed: 19", e.longitudeDelta)
    offset = 0.00005;
  }
  if ((e.longitudeDelta >= 0.0013) && (e.longitudeDelta <= 0.0017)) {
    console.log("zoom changed: 18", e.longitudeDelta)
    offset = 0.0001;
  }
  if ((e.longitudeDelta >= 0.0017) && (e.longitudeDelta <= 0.002)) {
    console.log("zoom changed: 17", e.longitudeDelta)
    offset = 0.00015;
  }
  if ((e.longitudeDelta >= 0.002) && (e.longitudeDelta <= 0.0025)) {
    console.log("zoom changed: 16", e.longitudeDelta)
    offset = 0.0002;
  }
  if ((e.longitudeDelta >= 0.0025) && (e.longitudeDelta <= 0.003)) {
    console.log("zoom changed: 15", e.longitudeDelta)
    offset = 0.00025
  }
  if ((e.longitudeDelta >= 0.003) && (e.longitudeDelta <= 0.0035)) {
    console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.0003
  }
  if ((e.longitudeDelta >= 0.0035) && (e.longitudeDelta <= 0.004)) {
    console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00035
  }
  if ((e.longitudeDelta >= 0.004) && (e.longitudeDelta <= 0.0045)) {
    console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.0004
  }
  if ((e.longitudeDelta >= 0.0045) && (e.longitudeDelta <= 0.005)) {
    console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00045
  }
  if ((e.longitudeDelta >= 0.005) && (e.longitudeDelta <= 0.0055)) {
    console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.0005
  }
  if ((e.longitudeDelta >= 0.0055) && (e.longitudeDelta <= 0.006)) {
    console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.00055
  }
  if ((e.longitudeDelta >= 0.006) && (e.longitudeDelta <= 0.0065)) {
    console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.0006
  }
  return offset
}
