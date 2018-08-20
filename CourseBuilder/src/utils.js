// util functions for the app

exports.createHoleConfig = () => {
  let h = {}
  h.properties = {}
  h.noLocationProperties = {}
  
  return h
 }

 exports.editTeeLocation = (t) => {
   let aKeyList = Object.keys(t)
   if (!("latitude" in aKeyList)) { return false }
   if (!("longitude" in aKeyList)) {return false }

   return true
 }

 exports.completeHoleLocation = (latlng, label, indicator) => {
  let geo = []

  geo[0] = {}
  geo[0].lat = latlng.lat + 0.00003
  geo[0].lng = latlng.lng + 0.00003
  geo[0].label = label + indicator++

  geo[1] = {}
  geo[1].lat = latlng.lat + 0.00003
  geo[1].lng = latlng.lng - 0.00003
  geo[1].label = label + indicator++

  geo[2] = {}
  geo[2].lat = latlng.lat 
  geo[2].lng = latlng.lng - 0.00003
  geo[2].label = label + indicator++

  geo[3] = {}
  geo[3].lat = latlng.lat 
  geo[3].lng = latlng.lng + 0.00003
  geo[3].label = label + indicator++

  geo[4] = {}
  geo[4].lat = latlng.lat - 0.00003
  geo[4].lng = latlng.lng - 0.00003 
  geo[4].label = label + indicator++

  geo[5] = {}
  geo[5].lat = latlng.lat - 0.00003
  geo[5].lng = latlng.lng + 0.00003
  geo[5].label = label + indicator

  return geo
}

exports.completeNo_HoleLocation = (latlng, label, indicator) => {
  let geo = []

  geo[0] = {}
  geo[0].lat = latlng.lat + 0.00003
  geo[0].lng = latlng.lng + 0.00003
  geo[0].label = label + indicator++

  geo[1] = {}
  geo[1].lat = latlng.lat + 0.00003
  geo[1].lng = latlng.lng - 0.00003
  geo[1].label = label + indicator++

  geo[2] = {}
  geo[2].lat = latlng.lat 
  geo[2].lng = latlng.lng - 0.00003
  geo[2].label = label + indicator++

  geo[3] = {}
  geo[3].lat = latlng.lat 
  geo[3].lng = latlng.lng + 0.00003
  geo[3].label = label + indicator++

  geo[4] = {}
  geo[4].lat = latlng.lat - 0.00003
  geo[4].lng = latlng.lng - 0.00003 
  geo[4].label = label + indicator++

  geo[5] = {}
  geo[5].lat = latlng.lat - 0.00003
  geo[5].lng = latlng.lng + 0.00003
  geo[5].label = label + indicator

  geo[6] = {}
  geo[6].lat = latlng.lat - 0.00003
  geo[6].lng = latlng.lng 
  geo[6].label = label + indicator

  geo[7] = {}
  geo[7].lat = latlng.lat + 0.00003
  geo[7].lng = latlng.lng 
  geo[7].label = label + indicator

  geo[8] = {}
  geo[8].lat = latlng.lat - 0.000009
  geo[8].lng = latlng.lng + 0.000009
  geo[8].label = label + indicator

  return geo
}

exports.convertGeoToGoogle = (latLng) => {
  // console.log("cv->",latLng)
  let geo = {}
  geo.lat = latLng.latitude
  geo.lng = latLng.longitude

  return geo
}

exports.convertGeoFromGoogle = (ll) => {
  
  let geo = {}
  
  geo.latitude = ll.lat
  geo.longitude = ll.lng

  return geo 
}

exports.fillInHoleConfigInfo = (geometry, lab) => {
  let y = {}
  y.lat = geometry.lat
  y.lng = geometry.lng
  y.label = lab
  return y
}