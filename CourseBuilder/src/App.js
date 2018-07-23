import React, { Component } from 'react';

import './App.css';

import HoleEditor from './HoleEditor'
import Locator from './Locator'
import GeneralButton from './GeneralButton'
import ButtonGroup from './ButtonGroup'



var pcourse = {}
pcourse.Features = [
  { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }, { properties: {} }
  // {
  //   TeeLocation: { lat: 39.45098138917806, lng:  -74.46965802358272 },
  //   FlagLocation: { lat: 39.448330308588766, lng: -74.47227585958126 },
  //   FairwayLocation: { lat: 39.44950673805768, lng:  -74.47081673787716 },
  // },
  // {
  //   TeeLocation: { lat: 39.447949207456354, lng: -74.47182524846676 },
  //   FairwayLocation: { lat: 39.44751839496901, lng: -74.47049487279537},
  //   FlagLocation: { lat: 39.447021300325545, lng: -74.46888554738644}
  // }
]



var convertGeoToGoogle = (latLng) => {
  // console.log("cv->",latLng)
  let geo = {}
  geo.lat = latLng.latitude
  geo.lng = latLng.longitude

  return geo
}

var convertGeoFromGoogle = (ll) => {
  
  let geo = {}
  
  geo.latitude = ll.lat
  geo.longitude = ll.lng

  return geo 
}

let fileReader = new FileReader()

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showHoleEditor: true,
      whichHole: 0,
      whichPos: "T",
      initialRegion: { lat: 36.296168, lng: -94.198221 },
      holeConfig: this.createHoleConfig(),
      aCourse: pcourse,
      selectedButtons: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    }
  }
  
  handleHelpClick = () => {
    document.getElementById("help").value ="This editor works on a single hole at a time.  A hole is the set { Tee, Fairway, Green }. At a minimum you must add a single Tee, Fairway and Green marker (i.e. a hole config) to the map.  You MUST click \"Save Hole\" after each hole config"
  }
 




  handleCourseObjClick(which, e) {
    // console.log("which", which, e)
    document.getElementById("Tee").style.background = '#ffffff'
    document.getElementById("Green").style.background = '#ffffff'
    document.getElementById("Fairway").style.background = '#ffffff'

    document.getElementById("Tee_Tmpl1").style.background = '#ffffff'
    document.getElementById("Tee_Tmpl2").style.background = '#ffffff'
    document.getElementById("Tee_Tmpl3").style.background = '#ffffff'

    document.getElementById("Green_Tmpl1").style.background = '#ffffff'
    document.getElementById("Green_Tmpl2").style.background = '#ffffff'
    document.getElementById("Green_Tmpl3").style.background = '#ffffff'

    document.getElementById("Fairway_Tmpl1").style.background = '#ffffff'
    document.getElementById("Fairway_Tmpl2").style.background = '#ffffff'
    document.getElementById("Fairway_Tmpl3").style.background = '#ffffff'

    switch(which) {
      case "T": {
        document.getElementById("Tee").style.background = '#00ff00'
        this.setState({whichPos: "T"}); 
        break
      }
      case "F": {
        document.getElementById("Green").style.background = '#00ff00'
        this.setState({whichPos: "F"}); 
        break
      }
      case "L": {
        document.getElementById("Fairway").style.background = '#00ff00'
        this.setState({whichPos: "L"}); 
        break
      }
      case "Tm1": {
        document.getElementById("Tee_Tmpl1").style.background = '#00ff00'
        this.setState({whichPos: "Tm1"}); 
        break
      }
      case "Tm2": {
        document.getElementById("Tee_Tmpl2").style.background = '#00ff00'
        this.setState({whichPos: "Tm2"}); 
        break
      }
      case "Tm3": {
        document.getElementById("Tee_Tmpl3").style.background = '#00ff00'
        this.setState({whichPos: "Tm3"}); 
        break
      }
      case "Fm1": {
        document.getElementById("Green_Tmpl1").style.background = '#00ff00'
        this.setState({whichPos: "Fm1"}); 
        break
      }
      case "Fm2": {
        document.getElementById("Green_Tmpl2").style.background = '#00ff00'
        this.setState({whichPos: "Fm2"}); 
        break
      }
      case "Fm3": {
        document.getElementById("Green_Tmpl3").style.background = '#00ff00'
        this.setState({whichPos: "Fm3"}); 
        break
      }
      case "Lm1": {
        document.getElementById("Fairway_Tmpl1").style.background = '#00ff00'
        this.setState({whichPos: "Lm1"}); 
        break
      }
      case "Lm2": {
        document.getElementById("Fairway_Tmpl2").style.background = '#00ff00'
        this.setState({whichPos: "Lm2"}); 
        break
      }
      case "Lm3": {
        document.getElementById("Fairway_Tmpl3").style.background = '#00ff00'
        this.setState({whichPos: "Lm3"}); 
        break
      }
      default: {
        console.log("handlCourseObjClick: you should NEVER Be here!!!")
      }
    }
  }

  handleClearClick = () => {
    document.getElementById("tloc").value = ""
    document.getElementById("floc").value = ""
    document.getElementById("lloc").value = ""

    document.getElementById("tTmp1").value = ""
    document.getElementById("tTmp2").value = ""
    document.getElementById("tTmp3").value = ""

    document.getElementById("fTmp1").value = ""
    document.getElementById("fTmp2").value = ""
    document.getElementById("fTmp3").value = ""

    document.getElementById("lTmp1").value = ""
    document.getElementById("lTmp2").value = ""
    document.getElementById("lTmp3").value = ""

    document.getElementById("Tee").style.background = '#ffffff'
    document.getElementById("Green").style.background = '#ffffff'
    document.getElementById("Fairway").style.background = '#ffffff'

    document.getElementById("Tee_Tmpl1").style.background = '#ffffff'
    document.getElementById("Tee_Tmpl2").style.background = '#ffffff'
    document.getElementById("Tee_Tmpl3").style.background = '#ffffff'

    document.getElementById("Green_Tmpl1").style.background = '#ffffff'
    document.getElementById("Green_Tmpl2").style.background = '#ffffff'
    document.getElementById("Green_Tmpl3").style.background = '#ffffff'

    document.getElementById("Fairway_Tmpl1").style.background = '#ffffff'
    document.getElementById("Fairway_Tmpl2").style.background = '#ffffff'
    document.getElementById("Fairway_Tmpl3").style.background = '#ffffff'

    document.getElementById("Tee").style.background = '#00ff00'
    this.setState({whichPos: "T"}); 
  }

  editTeeLocation = (t) => {
    let aKeyList = Object.keys(t)
    if (!("latitude" in aKeyList)) { return false }
    if (!("longitude" in aKeyList)) {return false }

    return true
  }

  handleSaveCourseClick = () => {
    let badHole = "0"
    let badKey = "teeLocation"

    let theCourse = JSON.parse(JSON.stringify(this.state.aCourse))

    theCourse.type = "FeatureCollection"
    theCourse.initialRegion = {}
 
    try {
      theCourse.initialRegion.latitude = theCourse.Features[0].TeeLocation.latitude
      theCourse.initialRegion.longitude = theCourse.Features[0].TeeLocation.longitude
      theCourse.initialRegion.latitudeDelta = 0.00005
      theCourse.initialRegion.longitudeDelta = 0.0000025

      theCourse.Features.forEach(function(p) {
        // console.log("Feat-->", p, theCourse.Features)
        if ("TeeLocation" in p.properties) { 
          console.log("t->", p.properties.number, p.properties.TeeLocation)
          badHole = p.properties.number
          badKey = "TeeLocation"
          p.properties.TeeLocation = convertGeoFromGoogle(p.properties.TeeLocation)        
        }
        
        if ("FlagLocation" in p.properties) {
          console.log("F->", p.properties.number, p.properties.FlagLocation)
          badHole = p.properties.number
          badKey = "FlagLocation"
          p.properties.FlagLocation = convertGeoFromGoogle(p.properties.FlagLocation)
        }
       
        if ("FairwayLocation" in p.properties) {
          console.log("f->", p.properties.number, p.properties.FairwayLocation)
          badHole = p.properties.number
          badKey = "FairwayLocation"
          p.properties.FairwayLocation = convertGeoFromGoogle(p.properties.FairwayLocation)
        }
        
        if ("teeTemplateCenter" in p.properties) {
          console.log("tee template:->", p.properties.number, p.properties.teeTemplateCenter)
          badHole = p.properties.number
          badKey = "teeTemplateCenter"
          p.properties.teeTemplateCenter[0] = convertGeoFromGoogle(p.properties.teeTemplateCenter[0])
          p.properties.teeTemplateCenter[1] = convertGeoFromGoogle(p.properties.teeTemplateCenter[1])
          p.properties.teeTemplateCenter[2] = convertGeoFromGoogle(p.properties.teeTemplateCenter[2])
        }
  
        if ("greenTemplateCenter" in p.properties) {
          console.log("gree template:->", p.properties.number, p.properties.greenTemplateCenter)
          badHole = p.properties.number
          badKey = "greenTemplateCenter"
          p.properties.greenTemplateCenter[0] = convertGeoFromGoogle(p.properties.greenTemplateCenter[0])
          p.properties.greenTemplateCenter[1] = convertGeoFromGoogle(p.properties.greenTemplateCenter[1])
          p.properties.greenTemplateCenter[2] = convertGeoFromGoogle(p.properties.greenTemplateCenter[2])
        }
        
        if ("fairwayTemplateCenter" in p.properties) { 
          console.log("fairway template:->", p.properties.number, p.properties.fairwayTemplateCenter)
          badHole = p.properties.number
          badKey = "fairwayTemplateCenter"
          p.properties.fairwayTemplateCenter[0] = convertGeoFromGoogle(p.properties.fairwayTemplateCenter[0])
          p.properties.fairwayTemplateCenter[1] = convertGeoFromGoogle(p.properties.fairwayTemplateCenter[1])
          p.properties.fairwayTemplateCenter[2] = convertGeoFromGoogle(p.properties.fairwayTemplateCenter[2])
        }
  
        if ("TeeLocation" in p.properties) {
          let num = p.properties.number 
          p.properties.Par = 4
          p.properties.Yards = 345
          p.properties.image =  "Hole" + num + ".png"
          p.properties.page = "Hole" + num + ".html"
          p.properties.number = num+1
          // p.properties.Tphoto = "./images/Tee2.png"
          // p.properties.Flagphoto = "./images/Hole" + num + ".png"
        }
      })
  
    } catch(error) {
      alert("bad file definition on hole: " + badHole + " " + badKey)
    }
    let content = JSON.stringify(theCourse, null, 2)
    console.log(content)
  }

  completeHoleLocation = (latlng) => {
    let geo = []

    geo[0] = {}
    geo[0].lat = latlng.lat + 0.00003
    geo[0].lng = latlng.lng + 0.00003

    geo[1] = {}
    geo[1].lat = latlng.lat + 0.00003
    geo[1].lng = latlng.lng - 0.00003

    geo[2] = {}
    geo[2].lat = latlng.lat 
    geo[2].lng = latlng.lng - 0.00003

    return geo
  }
  // 
  // the aCourse structure is sorted in numeric order on the "number" field
  handleSaveClick() {
    // console.log("aCou->", this.state.aCourse, this.state.whichHole) 

    // first make a copy
    let na = JSON.parse(JSON.stringify( this.state.aCourse ))
    // console.log("ooo--->", this.state.holeConfig)
    let o = {}
    o.type = "Feature"
    o.properties = {}
    o.properties.TeeLocation = this.state.holeConfig.properties.TeeLocation
    o.properties.FlagLocation = this.state.holeConfig.properties.FlagLocation
    o.properties.FairwayLocation = this.state.holeConfig.properties.FairwayLocation

    let geo = []
    o.properties.teeTemplateCenter = []
    if (this.state.holeConfig.properties.teeTemplateCenter1 === undefined) {
      geo = this.completeHoleLocation(this.state.holeConfig.properties.TeeLocation)
      o.properties.teeTemplateCenter[0] = geo[0]
      o.properties.teeTemplateCenter[1] = geo[1]
      o.properties.teeTemplateCenter[2] = geo[2]
    } else {
      o.properties.teeTemplateCenter[0] = this.state.holeConfig.properties.teeTemplateCenter1
      o.properties.teeTemplateCenter[1] = this.state.holeConfig.properties.teeTemplateCenter2
      o.properties.teeTemplateCenter[2] = this.state.holeConfig.properties.teeTemplateCenter3
    }
    
    o.properties.fairwayTemplateCenter = []
    if (this.state.holeConfig.properties.fairwayTemplateCenter1 === undefined) {
      geo = this.completeHoleLocation(this.state.holeConfig.properties.FairwayLocation)
      o.properties.fairwayTemplateCenter[0] = geo[0]
      o.properties.fairwayTemplateCenter[1] = geo[1]
      o.properties.fairwayTemplateCenter[2] = geo[2]  
    } else {
      o.properties.fairwayTemplateCenter[0] = this.state.holeConfig.properties.fairwayTemplateCenter1
      o.properties.fairwayTemplateCenter[1] = this.state.holeConfig.properties.fairwayTemplateCenter2
      o.properties.fairwayTemplateCenter[2] = this.state.holeConfig.properties.fairwayTemplateCenter3
    }

    o.properties.greenTemplateCenter = []
    if (this.state.holeConfig.properties.greenTemplateCenter1 === undefined) {
      geo = this.completeHoleLocation(this.state.holeConfig.properties.FlagLocation)
      o.properties.greenTemplateCenter[0] = geo[0]
      o.properties.greenTemplateCenter[1] = geo[1]
      o.properties.greenTemplateCenter[2] = geo[2]

    } else {
      o.properties.greenTemplateCenter[0] = this.state.holeConfig.properties.greenTemplateCenter1
      o.properties.greenTemplateCenter[1] = this.state.holeConfig.properties.greenTemplateCenter2
      o.properties.greenTemplateCenter[2] = this.state.holeConfig.properties.greenTemplateCenter3

    }
    
    o.properties.teeDrawingPattern = '3grp'
    o.properties.greenDrawingPattern = '3grp'
    o.properties.fairwayDrawingPattern = '3grp'
    o.properties.number = this.state.whichHole

    na.Features[o.properties.number] = o
    let sb = Object.assign({}, this.state.selectedButtons)
    sb[o.properties.number] = 1

    console.log("na-->", na)
    this.setState( { aCourse: na, selectedButtons: sb })
  }

  handleMapClick(latLng) {

    let geometry = {}
    geometry.lat = latLng.lat()
    geometry.lng = latLng.lng()
    let sg = JSON.stringify(geometry)

    switch(this.state.whichPos) {
      case "T": {        
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.TeeLocation = geometry
        // console.log("h-->", h)
        this.setState( {holeConfig: h} )
        document.getElementById("tloc").value = sg
        break
      }
      case "F": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.FlagLocation = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("floc").value = sg
        break
      }
      case "L": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.FairwayLocation = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("lloc").value = sg
        break
      }
      case "Tm1": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.teeTemplateCenter1 = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("tTmp1").value = sg
        break
      }
      case "Tm2": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.teeTemplateCenter2 = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("tTmp2").value = sg
        break
      }
      case "Tm3": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.teeTemplateCenter3 = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("tTmp3").value = sg
        break
      }
      case "Fm1": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig)) 
        h.properties.greenTemplateCenter1 = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("fTmp1").value = sg
        break
      }
      case "Fm2": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig)) 
        h.properties.greenTemplateCenter2 = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("fTmp2").value = sg
        break
      }
      case "Fm3": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig)) 
        h.properties.greenTemplateCenter3 = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("fTmp").value = sg
        break
      }
      case "Lm1": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig)) 
        h.properties.fairwayTemplateCenter1 = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("lTmp1").value = sg
        break
      }
      case "Lm2": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig)) 
        h.properties.fairwayTemplateCenter2 = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("lTmp2").value = sg
        break
      }
      case "Lm3": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig)) 
        h.properties.fairwayTemplateCenter3 = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("lTmp3").value = sg
        break
      }
      default: { console.log("handleMapClick: you should not be here! ", this.state.whichPos)}
    }
    
  }

  handleMarkerDrag(e, mr) {
    console.log("marker drag", mr, e.latLng.lat(), e.latLng.lng())
    let geometry = {}
    geometry.lat = e.latLng.lat()
    geometry.lng = e.latLng.lng()

    let h = this.state.holeConfig
    switch (mr) {
      case "TeeLocation": { 
        h.properties.TeeLocation = geometry; 
        document.getElementById("tloc").value = JSON.stringify(geometry)
        break 
      }
      case "FlagLocation": { 
        h.properties.FlagLocation = geometry; 
        document.getElementById("floc").value = JSON.stringify(geometry)
        break 
      }
      case "FairwayLocation": { 
        h.properties.fairwayLocation = geometry; 
        document.getElementById("lloc").value = JSON.stringify(geometry)
        break 
      }
      case "teeTemplateCenter1": { 
        h.properties.teeTemplateCenter1 = geometry; 
        document.getElementById("tTmp1").value = JSON.stringify(geometry)
        break 
      }
      case "teeTemplateCenter2": { 
        h.properties.teeTemplateCenter2 = geometry; 
        document.getElementById("tTmp2").value = JSON.stringify(geometry)
        break 
      }
      case "teeTemplateCenter3": { 
        h.properties.teeTemplateCenter3 = geometry; 
        document.getElementById("tTmp3").value = JSON.stringify(geometry)
        break 
      }
      case "greenTemplateCenter1": { 
        h.properties.greenTemplateCenter1 = geometry; 
        document.getElementById("fTmp1").value = JSON.stringify(geometry)
        break 
      }
      case "greenTemplateCenter2": { 
        h.properties.greenTemplateCenter2 = geometry; 
        document.getElementById("fTmp2").value = JSON.stringify(geometry)
        break 
      }
      case "greenTemplateCenter3": { 
        h.properties.greenTemplateCenter3 = geometry; 
        document.getElementById("fTmp3").value = JSON.stringify(geometry)
        break 
      }
      case "fairwayTemplateCenter1": { 
        h.properties.fairwayTemplateCenter1 = geometry; 
        document.getElementById("lTmp1").value = JSON.stringify(geometry)
        break 
      }
      case "fairwayTemplateCenter2": { 
        h.properties.fairwayTemplateCenter2 = geometry; 
        document.getElementById("lTmp2").value = JSON.stringify(geometry)
        break 
      }
      case "fairwayTemplateCenter3": { 
        h.properties.fairwayTemplateCenter3 = geometry; 
        document.getElementById("lTmp3").value = JSON.stringify(geometry)
        break 
      }
      default: {console.log("you should not be here: handlDragMarker", mr)}
    }
    // console.log("h->", h)
    this.setState( {holeConfig: h} )
  }
  
  createHoleConfig = () => {
   let h = {}
   h.properties = {}
   
   return h
  }
  handleHoleButtonClick(indx) {
    this.setState({ whichHole: indx })
    // console.log("indx", indx, this.state.aCourse)

    if (Object.keys(this.state.aCourse.Features[indx].properties).length === 0) {
      let h = this.createHoleConfig()
      this.setState({holeConfig: h})
      return
    }
    
    let h = this.createHoleConfig()
    // console.log("tee-->", this.state.aCourse.Features[indx].properties)
    h.properties.TeeLocation = this.state.aCourse.Features[indx].properties.TeeLocation
    h.properties.FlagLocation = this.state.aCourse.Features[indx].properties.FlagLocation
    h.properties.FairwayLocation = this.state.aCourse.Features[indx].properties.FairwayLocation

    h.properties.teeTemplateCenter1 = this.state.aCourse.Features[indx].properties.teeTemplateCenter[0]
    h.properties.teeTemplateCenter2 = this.state.aCourse.Features[indx].properties.teeTemplateCenter[1]
    h.properties.teeTemplateCenter3 = this.state.aCourse.Features[indx].properties.teeTemplateCenter[2]

    h.properties.greenTemplateCenter1 = this.state.aCourse.Features[indx].properties.greenTemplateCenter[0]
    h.properties.greenTemplateCenter2 = this.state.aCourse.Features[indx].properties.greenTemplateCenter[1]
    h.properties.greenTemplateCenter3 = this.state.aCourse.Features[indx].properties.greenTemplateCenter[2]
  
    h.properties.fairwayTemplateCenter1 = this.state.aCourse.Features[indx].properties.fairwayTemplateCenter[0]
    h.properties.fairwayTemplateCenter2 = this.state.aCourse.Features[indx].properties.fairwayTemplateCenter[1]
    h.properties.fairwayTemplateCenter3 = this.state.aCourse.Features[indx].properties.fairwayTemplateCenter[2]

    this.setState({holeConfig: h})
  
  }

  //
  // initial file handling
  handleFileResult = () => {
    let theCourse = JSON.parse(fileReader.result);

    theCourse.Features.forEach((p) => {
      let aKeyList = Object.keys(p.properties)
      // console.log("a k->", aKeyList)
      if (("teeLocation" in aKeyList) || ("TeeLocation" in aKeyList)) {
        if ("teeLocation" in aKeyList) {
          p.properties.TeeLocation = convertGeoToGoogle(p.properties.teeLocation)
        } else if ("TeeLocation" in aKeyList) {
          p.properties.TeeLocation = convertGeoToGoogle(p.properties.TeeLocation)
        }
      }

      if (("flagLocation" in aKeyList) || ("FlagLocation" in aKeyList)) {
        if ("FlagLocation" in aKeyList) {
          p.properties.FlagLocation = convertGeoToGoogle(p.properties.FlagLocation)
        } else if ("flagLocation" in aKeyList) {
          p.properties.FlagLocation = convertGeoToGoogle(p.properties.flagLocation)
        }
      } 
      
      if (("fairwayLocation" in aKeyList) || ("FairwayLocation" in aKeyList)) {
        if ("fairwayLocation" in aKeyList) {
          p.properties.FairwayLocation = convertGeoToGoogle(p.properties.fairwayLocation)
        } else if ("FairwayLocation" in aKeyList) {
          p.properties.FairwayLocation = convertGeoToGoogle(p.properties.FairwayLocation)
        }
      }
      

      let l = p.properties.teeTemplateCenter.length
      for(let z=0; z<l; z++) {
        // console.log("z->t", p.properties.teeTemplateCenter)
        p.properties.teeTemplateCenter[z] = convertGeoToGoogle(p.properties.teeTemplateCenter[z])
      }
      
      l = p.properties.greenTemplateCenter.length
      for(let z = 0; z<l; z++) {
        // console.log("z->g", p.properties.greenTemplateCenter)
        p.properties.greenTemplateCenter[z] = convertGeoToGoogle(p.properties.greenTemplateCenter[z])
      }
      
      l = p.properties.fairwayTemplateCenter.length
      for (let z=0; z<l; z++) {
        // console.log("z->f", p.properties.fairwayTemplateCenter)
        p.properties.fairwayTemplateCenter[z] = convertGeoToGoogle(p.properties.fairwayTemplateCenter[z])
      }
      
    })
    // console.log("yy-->", theCourse)
    this.setState({ aCourse: theCourse });
    console.log("ic->", theCourse)
    this.setState({ initialRegion: theCourse.initialRegion })
    this.handleHoleButtonClick(0)
    let llng = {}
    llng.lat = theCourse.initialRegion.latitude
    llng.lng = theCourse.initialRegion.longitude
    this.map.panTo(llng)
  }

  // 
  // initial file handling
  uploadFile(event) {
      let file = event.target.files[0];
      
      if (file) {
        
        fileReader.onloadend = this.handleFileResult;
        fileReader.readAsText(file)
      }
  }

  componentDidMount() {
    document.getElementById("h1").style.background = '#00ff00'
    document.getElementById("Tee").style.background = '#00ff00'
  }

  onMapMounted = (ref) => {
    // console.log("map is mounted", ref)
    this.map = ref
  }

  // ======================== render =========================
  render() {
    let deMap = null
    
    // console.log("a course-->", this.state.aCourse);
    let stSel = ""
    for (let j=0; j<18; j++) {
      
        if (this.state.selectedButtons[j] > 0) {
          stSel += (j + 1) + ","
        }
    }

    let API_KEY = "AIzaSyDc6A0WM1MsH8ZLU2d5B99n_3J9hjbR-do"
    let url = "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&v=3.exp&libraries=geometry,drawing,places"
    if (this.state.showHoleEditor) {
      deMap = 
          <HoleEditor
              key={990}
              isMarkerShown
              onMapMounted={this.onMapMounted}
              region={this.state.initialRegion}
              googleMapURL={url}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
  
              holeConfig={this.state.holeConfig}
              dragMarker={(e, i) => {this.handleMarkerDrag(e, i)}}
              mapClick={(ll) => {this.handleMapClick(ll)}}
          >
          </HoleEditor>
  
    } else {
      console.log("need to impl course editor")
    }
    return (
      <div>
        <div>
          {deMap}
        </div>

        <div className="buttonGroupContainer" >
          <button onClick={(e) => this.handleHoleButtonClick(e, -1)} >All</button>
          <ButtonGroup 
            selected={this.state.selectedButtons} 
            handleHoleButtonClick={(k) => {this.handleHoleButtonClick(k)}}
          />
        </div>
        <div className="generalButtonContainer" >
          <GeneralButton key={996} name="Help" handleClick={this.handleHelpClick} />
          <GeneralButton key={997} name="Clear" handleClick={this.handleClearClick} />
          <GeneralButton key={998} name="Save Hole" handleClick={() => {this.handleSaveClick()}} />
          <GeneralButton key={999} name="Save Course" handleClick={() => {this.handleSaveCourseClick()}} />
          
          <input type="file" 
            name="myFile"
            onChange={(e) => this.uploadFile(e)} 
          />
        </div>
        <div className="holeTeeContainer">
          <Locator ikey={991} name="Tee" type="tloc"  handleClick={(e) => this.handleCourseObjClick('T', e)}/>
          <Locator ikey={991} name="Tee_Tmpl1" type={"tTmp1"}  handleClick={(e) => this.handleCourseObjClick('Tm1', e)}/>
          <Locator ikey={991} name="Tee_Tmpl2" type={"tTmp2"}  handleClick={(e) => this.handleCourseObjClick('Tm2', e)}/>
          <Locator ikey={991} name="Tee_Tmpl3" type={"tTmp3"}  handleClick={(e) => this.handleCourseObjClick('Tm3', e)}/>
        </div>

       

        <div className="holeFairwayContainer">
          <Locator ikey={993} name="Fairway" type="lloc" handleClick={(e) => this.handleCourseObjClick("L", e)}/>
          <Locator ikey={993} name="Fairway_Tmpl1" type={"lTmp1"} handleClick={(e) => this.handleCourseObjClick("Lm1", e)}/>
          <Locator ikey={993} name="Fairway_Tmpl2" type={"lTmp2"} handleClick={(e) => this.handleCourseObjClick("Lm2", e)}/>
          <Locator ikey={993} name="Fairway_Tmpl3" type={"lTmp3"} handleClick={(e) => this.handleCourseObjClick("Lm3", e)}/>
        </div>

        <div className="holeGreenContainer">
          <Locator ikey={992} name="Green" type="floc"  handleClick={(e) => this.handleCourseObjClick("F", e)}/>
          <Locator ikey={992} name="Green_Tmpl1" type={"fTmp1"} handleClick={(e) => this.handleCourseObjClick("Fm1", e)}/>
          <Locator ikey={992} name="Green_Tmpl2" type={"fTmp2"} handleClick={(e) => this.handleCourseObjClick("Fm2", e)}/>
          <Locator ikey={992} name="Green_Tmpl3" type={"fTmp3"} handleClick={(e) => this.handleCourseObjClick("Fm3", e)}/>
        </div>

        <div>
        <label id="debugt" >{this.state.whichPos}</label>
        <label id="debugc" >{
          stSel
        }</label>
        <textarea id="help" rows="25" cols="200" ></textarea>
        </div>
      </div>
    )
  }
}

export default App;
