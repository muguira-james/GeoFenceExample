createLatLng = function(lat, lng) {
  var p2 = "{ \"latitude\": " + lat + ", \"longitude\": " + lng + "}"
  return JSON.parse(p2);
}
exports.boxCalc = function(centerPoint, zoomOffSet, index) {
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
  console.log("WTF: boxCalc: i was given an index > 6???", index)
  // return new window.google.maps.LatLng(0.0, 0.0);
}

//
exports.computeZoomOffSet = function(e) {
  let offset = 0.0005;

  if (e === null) return offset;

  console.log("->", e.latitude, e.longitude)

  if (e.longitudeDelta <= 0.0009) {
    console.log("zoom changed: 20", e.longitudeDelta)
    offset = 0.00009;
  }
  if ((e.longitudeDelta >= 0.0009) && (e.longitudeDelta <= 0.0017)) {
    console.log("zoom changed: 19", e.longitudeDelta)
    offset = 0.0001;
  }
  if ((e.longitudeDelta >= 0.0017) && (e.longitudeDelta <= 0.002)) {
    console.log("zoom changed: 18", e.longitudeDelta)
    offset = 0.0002;
  }
  if ((e.longitudeDelta >= 0.002) && (e.longitudeDelta <= 0.003)) {
    console.log("zoom changed: 17", e.longitudeDelta)
    offset = 0.0003;
  }
  if ((e.longitudeDelta >= 0.003) && (e.longitudeDelta <= 0.004)) {
    console.log("zoom changed: 16", e.longitudeDelta)
    offset = 0.0004;
  }
  if ((e.longitudeDelta >= 0.004) && (e.longitudeDelta <= 0.005)) {
    console.log("zoom changed: 15", e.longitudeDelta)
    offset = 0.0005
  }
  if ((e.longitudeDelta >= 0.005) && (e.longitudeDelta <= 0.006)) {
    console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.0006
  }
  if ((e.longitudeDelta >= 0.006) && (e.longitudeDelta <= 0.007)) {
    console.log("zoom changed: 14 ", e.longitudeDelta)
    offset = 0.007
  }
  return offset
}
