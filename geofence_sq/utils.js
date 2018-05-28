// generate an array of {lat, lng} objects
//
// notice last object closes the polygon
_createPolygon = function(topLeft, topRight, bottomRight, bottomLeft) {
  resultPolygon = []
  resultPolygon.push(topLeft)     // 1
  resultPolygon.push(topRight)    // 2
  resultPolygon.push(bottomRight) // 3
  resultPolygon.push(bottomLeft)  // 4
  resultPolygon.push(topLeft)     // 5

  return resultPolygon
}


var latOffSet = 0.0005;
var lngOffSet = 0.0005;


// pt = { lat, lng }
exports.createPolygonFromPoint = (pt) => {
  let topLeft = {}
  topLeft.latitude = (pt.latitude + latOffSet)
  topLeft.longitude = (pt.longitude - lngOffSet)

  let topRight = {}
  topRight.latitude = (pt.latitude + latOffSet)
  topRight.longitude = (pt.longitude + lngOffSet)

  let bottomRight = {}
  bottomRight.latitude = (pt.latitude - latOffSet)
  bottomRight.longitude = (pt.longitude + lngOffSet)

  let bottomLeft = {}
  bottomLeft.latitude = (pt.latitude - latOffSet)
  bottomLeft.longitude = (pt.longitude - lngOffSet)

  z = this._createPolygon(topLeft, topRight, bottomRight, bottomLeft)
  return z
}

// poly = [ {let, lng}, {lat, lng} ]
exports.convertSq2Polygon = (poly) => {
  let topLeft = poly[0]

  let ropRight = {}
  topRight.latitude = poly[0].latitude
  topRight.longitude = (poly[0].longitude - lngOffSet)

  let bottomLeft = {}
  bottomLeft.latitude = (poly[0].latitude - latOffSet)
  bottomLeft.longitude = poly[0].longtiude

  let bottomRight = {}
  bottomRight.latitude = (poly[0].latitude - latOffSet)
  bottomRight.longitude = (poly[0].longitude - lngOffSet)

  return this._createPolygon(topLeft, topRight, bottomRight, bottomLeft)
}

// pt = { lat, lng }
exports.convertPoint2Sq = (pt) =>{
  let topLeft = {}
  topLeft.latitude = (pt.latitude + latOffSet)
  topLeft.longitude = (pt.longitude - lngOffSet)

  let bottomRight = {}
  bottomRight.latitude = (pt.latitude - latOffSet)
  bottomRight.longitude = (pt.longitude + lngOffSet)

  z = []
  z.push(topLeft)
  z.push(bottomRight)
  return z
}
