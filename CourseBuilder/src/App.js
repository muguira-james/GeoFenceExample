import React, { Component } from 'react';

import './App.css';

import HoleEditor from './HoleEditor'
import Locator from './Locator'
import GeneralButton from './GeneralButton'
import ButtonGroup from './ButtonGroup'

import utils from './utils'
import NoHoleLocation from './NoHoleLocation'

var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var CourseFileVersion = 'v0.0.1'

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



let fileReader = new FileReader()

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showHoleEditor: true,
      whichHole: 0,
      whichPos: "T",
      initialRegion: { lat: 36.296168, lng: -94.198221 },
      holeConfig: utils.createHoleConfig(),
      aCourse: pcourse,
      selectedButtons: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }
  }

  handleHelpClick = () => {
    document.getElementById("help").value = "This editor works on a single hole at a time.  A hole is the set { Tee, Fairway, Green }. At a minimum you must add a single Tee, Fairway and Green marker (i.e. a hole config) to the map.  You MUST click \"Save Hole\" after each hole config"
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

    switch (which) {
      case "T": {
        document.getElementById("Tee").style.background = '#00ff00'
        this.setState({ whichPos: "T" });
        break
      }
      case "F": {
        document.getElementById("Green").style.background = '#00ff00'
        this.setState({ whichPos: "F" });
        break
      }
      case "L": {
        document.getElementById("Fairway").style.background = '#00ff00'
        this.setState({ whichPos: "L" });
        break
      }
      case "Tm1": {
        document.getElementById("Tee_Tmpl1").style.background = '#00ff00'
        this.setState({ whichPos: "Tm1" });
        break
      }
      case "Tm2": {
        document.getElementById("Tee_Tmpl2").style.background = '#00ff00'
        this.setState({ whichPos: "Tm2" });
        break
      }
      case "Tm3": {
        document.getElementById("Tee_Tmpl3").style.background = '#00ff00'
        this.setState({ whichPos: "Tm3" });
        break
      }
      case "Fm1": {
        document.getElementById("Green_Tmpl1").style.background = '#00ff00'
        this.setState({ whichPos: "Fm1" });
        break
      }
      case "Fm2": {
        document.getElementById("Green_Tmpl2").style.background = '#00ff00'
        this.setState({ whichPos: "Fm2" });
        break
      }
      case "Fm3": {
        document.getElementById("Green_Tmpl3").style.background = '#00ff00'
        this.setState({ whichPos: "Fm3" });
        break
      }
      case "Lm1": {
        document.getElementById("Fairway_Tmpl1").style.background = '#00ff00'
        this.setState({ whichPos: "Lm1" });
        break
      }
      case "Lm2": {
        document.getElementById("Fairway_Tmpl2").style.background = '#00ff00'
        this.setState({ whichPos: "Lm2" });
        break
      }
      case "Lm3": {
        document.getElementById("Fairway_Tmpl3").style.background = '#00ff00'
        this.setState({ whichPos: "Lm3" });
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
    this.setState({ whichPos: "T" });
  }


  handleSaveCourseClick = () => {
    let badHole = "0"
    let badKey = "teeLocation"

    let theCourse = JSON.parse(JSON.stringify(this.state.aCourse))

    theCourse.type = "FeatureCollection"
    theCourse.initialRegion = {}

    try {
      console.log("Feat-->", theCourse.Features[0])
      theCourse.initialRegion.latitude = theCourse.Features[0].properties.TeeLocation.lat
      theCourse.initialRegion.longitude = theCourse.Features[0].properties.TeeLocation.lng
      theCourse.initialRegion.latitudeDelta = 0.00005
      theCourse.initialRegion.longitudeDelta = 0.0000025

      theCourse.courseFileVersion = CourseFileVersion

      theCourse.Features.forEach(function (p) {

        if ("TeeLocation" in p.properties) {
          console.log("t->", p.properties.number, p.properties.TeeLocation)
          badHole = p.properties.number
          badKey = "TeeLocation"
          p.properties.TeeLocation = utils.convertGeoFromGoogle(p.properties.TeeLocation)
        }

        if ("FlagLocation" in p.properties) {
          console.log("F->", p.properties.number, p.properties.FlagLocation)
          badHole = p.properties.number
          badKey = "FlagLocation"
          p.properties.FlagLocation = utils.convertGeoFromGoogle(p.properties.FlagLocation)
        }

        if ("FairwayLocation" in p.properties) {
          console.log("f->", p.properties.number, p.properties.FairwayLocation)
          badHole = p.properties.number
          badKey = "FairwayLocation"
          p.properties.FairwayLocation = utils.convertGeoFromGoogle(p.properties.FairwayLocation)
        }

        if ("teeTemplateCenter" in p.properties) {
          console.log("tee template:->", p.properties.number, p.properties.teeTemplateCenter)
          badHole = p.properties.number
          badKey = "teeTemplateCenter"
          p.properties.teeTemplateCenter[0] = utils.convertGeoFromGoogle(p.properties.teeTemplateCenter[0])
          p.properties.teeTemplateCenter[1] = utils.convertGeoFromGoogle(p.properties.teeTemplateCenter[1])
          p.properties.teeTemplateCenter[2] = utils.convertGeoFromGoogle(p.properties.teeTemplateCenter[2])

          p.properties.teeTemplateCenter[3] = utils.convertGeoFromGoogle(p.properties.teeTemplateCenter[3])
          p.properties.teeTemplateCenter[4] = utils.convertGeoFromGoogle(p.properties.teeTemplateCenter[4])
          p.properties.teeTemplateCenter[5] = utils.convertGeoFromGoogle(p.properties.teeTemplateCenter[5])
        }

        if ("greenTemplateCenter" in p.properties) {
          console.log("gree template:->", p.properties.number, p.properties.greenTemplateCenter)
          badHole = p.properties.number
          badKey = "greenTemplateCenter"
          p.properties.greenTemplateCenter[0] = utils.convertGeoFromGoogle(p.properties.greenTemplateCenter[0])
          p.properties.greenTemplateCenter[1] = utils.convertGeoFromGoogle(p.properties.greenTemplateCenter[1])
          p.properties.greenTemplateCenter[2] = utils.convertGeoFromGoogle(p.properties.greenTemplateCenter[2])

          p.properties.greenTemplateCenter[3] = utils.convertGeoFromGoogle(p.properties.greenTemplateCenter[3])
          p.properties.greenTemplateCenter[4] = utils.convertGeoFromGoogle(p.properties.greenTemplateCenter[4])
          p.properties.greenTemplateCenter[5] = utils.convertGeoFromGoogle(p.properties.greenTemplateCenter[5])
        }

        if ("fairwayTemplateCenter" in p.properties) {
          console.log("fairway template:->", p.properties.number, p.properties.fairwayTemplateCenter)
          badHole = p.properties.number
          badKey = "fairwayTemplateCenter"
          p.properties.fairwayTemplateCenter[0] = utils.convertGeoFromGoogle(p.properties.fairwayTemplateCenter[0])
          p.properties.fairwayTemplateCenter[1] = utils.convertGeoFromGoogle(p.properties.fairwayTemplateCenter[1])
          p.properties.fairwayTemplateCenter[2] = utils.convertGeoFromGoogle(p.properties.fairwayTemplateCenter[2])

          p.properties.fairwayTemplateCenter[3] = utils.convertGeoFromGoogle(p.properties.fairwayTemplateCenter[3])
          p.properties.fairwayTemplateCenter[4] = utils.convertGeoFromGoogle(p.properties.fairwayTemplateCenter[4])
          p.properties.fairwayTemplateCenter[5] = utils.convertGeoFromGoogle(p.properties.fairwayTemplateCenter[5])
        }

        if ("TeeLocation" in p.properties) {
          let num = p.properties.number
          p.properties.Par = 4
          p.properties.Yards = 345
          p.properties.image = "Hole" + num + ".png"
          p.properties.page = "Hole" + num + ".html"
          p.properties.number = num + 1
          
          // p.properties.Tphoto = "./images/Tee2.png"
          // p.properties.Flagphoto = "./images/Hole" + num + ".png"
        }
      })

    } catch (error) {
      alert("bad file definition on hole: " + badHole + " " + badKey)
    }
    let content = JSON.stringify(theCourse, null, 2)
    let outp = document.getElementById('help')
    outp.value = content
    console.log(content)
  }


  // 
  // save the holeConfig struct into the aCourse for the hole you are working on
  handleSaveHoleConfigClick(holeConfig) {
    // console.log("aCou->", this.state.aCourse, this.state.whichHole) 

    // first make a copy
    let na = JSON.parse(JSON.stringify(this.state.aCourse))
    // console.log("ooo--->", this.state.holeConfig)
    let o = {}
    o.type = "Feature"
    o.properties = {}
    o.properties.TeeLocation = holeConfig.properties.TeeLocation
    o.properties.FlagLocation = holeConfig.properties.FlagLocation
    o.properties.FairwayLocation = holeConfig.properties.FairwayLocation

    let geo = []
    o.properties.teeTemplateCenter = []
    geo = utils.completeHoleLocation(holeConfig.properties.TeeLocation, 't', 1)
    if (holeConfig.properties.teeTemplateCenter1 === undefined) {
      // console.log("lab?->", holeConfig.properties, geo)
      o.properties.teeTemplateCenter[0] = geo[0]
      o.properties.teeTemplateCenter[1] = geo[1]
      o.properties.teeTemplateCenter[2] = geo[2]

      o.properties.teeTemplateCenter[3] = geo[3]
      o.properties.teeTemplateCenter[4] = geo[4]
      o.properties.teeTemplateCenter[5] = geo[5]
    } else {
      o.properties.teeTemplateCenter[0] = holeConfig.properties.teeTemplateCenter1
      o.properties.teeTemplateCenter[1] = holeConfig.properties.teeTemplateCenter2
      o.properties.teeTemplateCenter[2] = holeConfig.properties.teeTemplateCenter3

      if (holeConfig.properties.teeTemplateCenter4 === undefined) {
        o.properties.teeTemplateCenter[3] = geo[3]
        o.properties.teeTemplateCenter[4] = geo[4]
        o.properties.teeTemplateCenter[5] = geo[5]
      } else {
        o.properties.teeTemplateCenter[3] = holeConfig.properties.teeTemplateCenter4
        o.properties.teeTemplateCenter[4] = holeConfig.properties.teeTemplateCenter5
        o.properties.teeTemplateCenter[5] = holeConfig.properties.teeTemplateCenter6
      }

    }

    o.properties.fairwayTemplateCenter = []
    geo = utils.completeHoleLocation(holeConfig.properties.FairwayLocation, 'f', 1)
    if (holeConfig.properties.fairwayTemplateCenter1 === undefined) {
      o.properties.fairwayTemplateCenter[0] = geo[0]
      o.properties.fairwayTemplateCenter[1] = geo[1]
      o.properties.fairwayTemplateCenter[2] = geo[2]

      o.properties.fairwayTemplateCenter[3] = geo[3]
      o.properties.fairwayTemplateCenter[4] = geo[4]
      o.properties.fairwayTemplateCenter[5] = geo[5]
    } else {
      o.properties.fairwayTemplateCenter[0] = holeConfig.properties.fairwayTemplateCenter1
      o.properties.fairwayTemplateCenter[1] = holeConfig.properties.fairwayTemplateCenter2
      o.properties.fairwayTemplateCenter[2] = holeConfig.properties.fairwayTemplateCenter3

      if (holeConfig.properties.fairwayTemplateCenter4 === undefined) {
        o.properties.fairwayTemplateCenter[3] = geo[3]
        o.properties.fairwayTemplateCenter[4] = geo[4]
        o.properties.fairwayTemplateCenter[5] = geo[5]
      } else {
        o.properties.fairwayTemplateCenter[3] = holeConfig.properties.fairwayTemplateCenter4
        o.properties.fairwayTemplateCenter[4] = holeConfig.properties.fairwayTemplateCenter5
        o.properties.fairwayTemplateCenter[5] = holeConfig.properties.fairwayTemplateCenter6
      }
    }

    o.properties.greenTemplateCenter = []
    geo = utils.completeHoleLocation(holeConfig.properties.FlagLocation, 'g', 1)
    if (holeConfig.properties.greenTemplateCenter1 === undefined) {
      
      o.properties.greenTemplateCenter[0] = geo[0]
      o.properties.greenTemplateCenter[1] = geo[1]
      o.properties.greenTemplateCenter[2] = geo[2]

      o.properties.greenTemplateCenter[3] = geo[3]
      o.properties.greenTemplateCenter[4] = geo[4]
      o.properties.greenTemplateCenter[5] = geo[5]
    } else {
      o.properties.greenTemplateCenter[0] = holeConfig.properties.greenTemplateCenter1
      o.properties.greenTemplateCenter[1] = holeConfig.properties.greenTemplateCenter2
      o.properties.greenTemplateCenter[2] = holeConfig.properties.greenTemplateCenter3

      if (holeConfig.properties.greenTemplateCenter4 === undefined) {
        o.properties.greenTemplateCenter[3] = geo[3]
        o.properties.greenTemplateCenter[4] = geo[4]
        o.properties.greenTemplateCenter[5] = geo[5]
      } else {
        o.properties.greenTemplateCenter[3] = holeConfig.properties.greenTemplateCenter4
        o.properties.greenTemplateCenter[4] = holeConfig.properties.greenTemplateCenter5
        o.properties.greenTemplateCenter[5] = holeConfig.properties.greenTemplateCenter6
      }
    }

    o.properties.teeDrawingPattern = '3grp'
    o.properties.greenDrawingPattern = '3grp'
    o.properties.fairwayDrawingPattern = '3grp'
    o.properties.number = this.state.whichHole

    if (holeConfig.noLocationProperties !== undefined) {
      o.noLocationProperties = JSON.parse(JSON.stringify(holeConfig.noLocationProperties))
    }
    na.Features[o.properties.number] = o
    let sb = Object.assign({}, this.state.selectedButtons)
    sb[o.properties.number] = 1

    // console.log("na-->", na, sb)
    this.setState({ aCourse: na, selectedButtons: sb })
  }

  handleMapClick(latLng) {

    let geometry = {}
    geometry.lat = latLng.lat()
    geometry.lng = latLng.lng()
    let sg = JSON.stringify(geometry)

    switch (this.state.whichPos) {
      case "T": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.TeeLocation = utils.fillInFairwayInfo(geometry, 't')
        // console.log("h-->", h)
        this.setState({ holeConfig: h })
        document.getElementById("tloc").value = sg
        break
      }
      case "F": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.FlagLocation = utils.fillInFairwayInfo(geometry, 'g')
        this.setState({ holeConfig: h })
        document.getElementById("floc").value = sg
        break
      }

      case "L": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.FairwayLocation = utils.fillInFairwayInfo(geometry, 'f')
        h.noLocationProperties.FairwayLocation = geometry
        this.setState({ holeConfig: h })
        document.getElementById("lloc").value = sg
        break
      }
      case "Tm1": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.teeTemplateCenter1 = utils.fillInFairwayInfo(geometry, 'A')
        this.setState({ holeConfig: h })
        document.getElementById("tTmp1").value = sg
        break
      }
      case "Tm2": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.teeTemplateCenter2 = utils.fillInFairwayInfo(geometry, 'B')
        this.setState({ holeConfig: h })
        document.getElementById("tTmp2").value = sg
        break
      }
      case "Tm3": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.teeTemplateCenter3 = utils.fillInFairwayInfo(geometry, 'C')
        this.setState({ holeConfig: h })
        document.getElementById("tTmp3").value = sg
        break
      }
      case "Tm4": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.teeTemplateCenter4 = utils.fillInFairwayInfo(geometry, 'D')
        this.setState({ holeConfig: h })
        document.getElementById("tTmp4").value = sg
        break
      }
      case "Tm5": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.teeTemplateCenter5 = utils.fillInFairwayInfo(geometry, 'E')
        this.setState({ holeConfig: h })
        document.getElementById("tTmp5").value = sg
        break
      }
      case "Tm6": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.teeTemplateCenter6 = utils.fillInFairwayInfo(geometry, 'F')
        this.setState({ holeConfig: h })
        document.getElementById("tTmp6").value = sg
        break
      }
      case "Fm1": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.greenTemplateCenter1 = utils.fillInFairwayInfo(geometry, 'G')
        this.setState({ holeConfig: h })
        document.getElementById("fTmp1").value = sg
        break
      }
      case "Fm2": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.greenTemplateCenter2 = utils.fillInFairwayInfo(geometry, 'H')
        this.setState({ holeConfig: h })
        document.getElementById("fTmp2").value = sg
        break
      }
      case "Fm3": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.greenTemplateCenter3 = utils.fillInFairwayInfo(geometry, 'I')
        this.setState({ holeConfig: h })
        document.getElementById("fTmp3").value = sg
        break
      }
      case "Fm4": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.greenTemplateCenter4 = utils.fillInFairwayInfo(geometry, 'J')
        this.setState({ holeConfig: h })
        document.getElementById("fTmp4").value = sg
        break
      }
      case "Fm5": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.greenTemplateCenter5 = utils.fillInFairwayInfo(geometry, 'K')
        this.setState({ holeConfig: h })
        document.getElementById("fTmp5").value = sg
        break
      }
      case "Fm6": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.greenTemplateCenter6 = utils.fillInFairwayInfo(geometry, 'L')
        this.setState({ holeConfig: h })
        document.getElementById("fTmp6").value = sg
        break
      }
      case "Lm1": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.fairwayTemplateCenter1 = utils.fillInFairwayInfo(geometry, 'M')
        this.setState({ holeConfig: h })
        document.getElementById("lTmp1").value = sg
        break
      }
      case "Lm2": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.fairwayTemplateCenter2 = utils.fillInFairwayInfo(geometry, 'N')
        this.setState({ holeConfig: h })
        document.getElementById("lTmp2").value = sg
        break
      }
      case "Lm3": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.fairwayTemplateCenter3 = utils.fillInFairwayInfo(geometry, 'O')
        this.setState({ holeConfig: h })
        document.getElementById("lTmp3").value = sg
        break
      }
      case "Lm4": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.fairwayTemplateCenter4 = utils.fillInFairwayInfo(geometry, 'P')
        this.setState({ holeConfig: h })
        document.getElementById("lTmp4").value = sg
        break
      }
      case "Lm5": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.fairwayTemplateCenter5 = utils.fillInFairwayInfo(geometry, 'Q')
        this.setState({ holeConfig: h })
        document.getElementById("lTmp5").value = sg
        break
      }
      case "Lm6": {
        let h = JSON.parse(JSON.stringify(this.state.holeConfig))
        h.properties.fairwayTemplateCenter6 = utils.fillInFairwayInfo(geometry, 'R')
        this.setState({ holeConfig: h })
        document.getElementById("lTmp6").value = sg
        break
      }
      default: { console.log("handleMapClick: you should not be here! ", this.state.whichPos) }
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
      case "teeTemplateCenter4": {
        h.properties.teeTemplateCenter4 = geometry;
        document.getElementById("tTmp4").value = JSON.stringify(geometry)
        break
      }
      case "teeTemplateCenter5": {
        h.properties.teeTemplateCenter5 = geometry;
        document.getElementById("tTmp5").value = JSON.stringify(geometry)
        break
      }
      case "teeTemplateCenter6": {
        h.properties.teeTemplateCenter6 = geometry;
        document.getElementById("tTmp6").value = JSON.stringify(geometry)
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
      case "greenTemplateCenter4": {
        h.properties.greenTemplateCenter4 = geometry;
        document.getElementById("fTmp4").value = JSON.stringify(geometry)
        break
      }
      case "greenTemplateCenter5": {
        h.properties.greenTemplateCenter5 = geometry;
        document.getElementById("fTmp5").value = JSON.stringify(geometry)
        break
      }
      case "greenTemplateCenter6": {
        h.properties.greenTemplateCenter6 = geometry;
        document.getElementById("fTmp6").value = JSON.stringify(geometry)
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
      case "fairwayTemplateCenter4": {
        h.properties.fairwayTemplateCenter4 = geometry;
        document.getElementById("lTmp4").value = JSON.stringify(geometry)
        break
      }
      case "fairwayTemplateCenter5": {
        h.properties.fairwayTemplateCenter5 = geometry;
        document.getElementById("lTmp5").value = JSON.stringify(geometry)
        break
      }
      case "fairwayTemplateCenter6": {
        h.properties.fairwayTemplateCenter6 = geometry;
        document.getElementById("lTmp6").value = JSON.stringify(geometry)
        break
      }
      default: { console.log("you should not be here: handlDragMarker", mr) }
    }
    // console.log("h->", h)
    this.setState({ holeConfig: h })
  }


  handleHoleButtonClick(indx) {
    if (typeof (indx) !== 'number') {
      console.log("you clikc the 'ALL' button - it does nothing")
      return
    }

    this.setState({ whichHole: indx })
    // console.log("indx", indx, typeof (indx))

    if (Object.keys(this.state.aCourse.Features[indx].properties).length === 0) {
      let h = utils.createHoleConfig()
      this.setState({ holeConfig: h })
      return
    }

    let h = utils.createHoleConfig()
    // console.log("tee-->", this.state.aCourse.Features[indx].properties)
    h.properties.TeeLocation = this.state.aCourse.Features[indx].properties.TeeLocation
    h.properties.FlagLocation = this.state.aCourse.Features[indx].properties.FlagLocation
    h.properties.FairwayLocation = this.state.aCourse.Features[indx].properties.FairwayLocation

    h.properties.teeTemplateCenter1 = this.state.aCourse.Features[indx].properties.teeTemplateCenter[0]
    h.properties.teeTemplateCenter2 = this.state.aCourse.Features[indx].properties.teeTemplateCenter[1]
    h.properties.teeTemplateCenter3 = this.state.aCourse.Features[indx].properties.teeTemplateCenter[2]

    h.properties.teeTemplateCenter4 = this.state.aCourse.Features[indx].properties.teeTemplateCenter[3]
    h.properties.teeTemplateCenter5 = this.state.aCourse.Features[indx].properties.teeTemplateCenter[4]
    h.properties.teeTemplateCenter6 = this.state.aCourse.Features[indx].properties.teeTemplateCenter[5]

    h.properties.greenTemplateCenter1 = this.state.aCourse.Features[indx].properties.greenTemplateCenter[0]
    h.properties.greenTemplateCenter2 = this.state.aCourse.Features[indx].properties.greenTemplateCenter[1]
    h.properties.greenTemplateCenter3 = this.state.aCourse.Features[indx].properties.greenTemplateCenter[2]

    h.properties.greenTemplateCenter4 = this.state.aCourse.Features[indx].properties.greenTemplateCenter[3]
    h.properties.greenTemplateCenter5 = this.state.aCourse.Features[indx].properties.greenTemplateCenter[4]
    h.properties.greenTemplateCenter6 = this.state.aCourse.Features[indx].properties.greenTemplateCenter[5]

    h.properties.fairwayTemplateCenter1 = this.state.aCourse.Features[indx].properties.fairwayTemplateCenter[0]
    h.properties.fairwayTemplateCenter2 = this.state.aCourse.Features[indx].properties.fairwayTemplateCenter[1]
    h.properties.fairwayTemplateCenter3 = this.state.aCourse.Features[indx].properties.fairwayTemplateCenter[2]

    h.properties.fairwayTemplateCenter4 = this.state.aCourse.Features[indx].properties.fairwayTemplateCenter[3]
    h.properties.fairwayTemplateCenter5 = this.state.aCourse.Features[indx].properties.fairwayTemplateCenter[4]
    h.properties.fairwayTemplateCenter6 = this.state.aCourse.Features[indx].properties.fairwayTemplateCenter[5]

    h.noLocationProperties.FairwayLocation = this.state.aCourse.Features[indx].noLocationProperties.FairwayLocation
    h.noLocationProperties.fairwayTemplateCenter1 = this.state.aCourse.Features[indx].noLocationProperties.fairwayTemplateCenter1
    h.noLocationProperties.fairwayTemplateCenter2 = this.state.aCourse.Features[indx].noLocationProperties.fairwayTemplateCenter2
    h.noLocationProperties.fairwayTemplateCenter3 = this.state.aCourse.Features[indx].noLocationProperties.fairwayTemplateCenter3

    h.noLocationProperties.fairwayTemplateCenter4 = this.state.aCourse.Features[indx].noLocationProperties.fairwayTemplateCenter4
    h.noLocationProperties.fairwayTemplateCenter5 = this.state.aCourse.Features[indx].noLocationProperties.fairwayTemplateCenter5
    h.noLocationProperties.fairwayTemplateCenter6 = this.state.aCourse.Features[indx].noLocationProperties.fairwayTemplateCenter6

    h.noLocationProperties.fairwayTemplateCenter7 = this.state.aCourse.Features[indx].noLocationProperties.fairwayTemplateCenter7
    h.noLocationProperties.fairwayTemplateCenter8 = this.state.aCourse.Features[indx].noLocationProperties.fairwayTemplateCenter8
    h.noLocationProperties.fairwayTemplateCenter9 = this.state.aCourse.Features[indx].noLocationProperties.fairwayTemplateCenter9

    this.setState({ holeConfig: h })

  }

  //
  // initial file handling
  handleFileResult = () => {
    let h = utils.createHoleConfig()
    let theCourse = JSON.parse(fileReader.result);

    for (let zz = 0; zz < 18; zz++) {
      let p = theCourse.Features[zz]
      let aKeyList = Object.keys(p.properties)

      if ((aKeyList.includes("teeLocation")) || (aKeyList.includes("TeeLocation"))) {
        if (aKeyList.includes("teeLocation")) {
          p.properties.TeeLocation = utils.convertGeoToGoogle(p.properties.TeeLocation)
        } else if (aKeyList.includes("TeeLocation")) {
          p.properties.TeeLocation = utils.convertGeoToGoogle(p.properties.TeeLocation)
        }
      }

      if ((aKeyList.includes("flagLocation")) || (aKeyList.includes("FlagLocation"))) {
        if (aKeyList.includes("FlagLocation")) {
          p.properties.FlagLocation = utils.convertGeoToGoogle(p.properties.FlagLocation)
        } else if (aKeyList.includes("flagLocation")) {
          p.properties.FlagLocation = utils.convertGeoToGoogle(p.properties.flagLocation)
        }
      }

      if ((aKeyList.includes("fairwayLocation")) || (aKeyList.includes("FairwayLocation"))) {
        if (aKeyList.includes("fairwayLocation")) {
          p.properties.FairwayLocation = utils.convertGeoToGoogle(p.properties.fairwayLocation)
        } else if (aKeyList.includes("FairwayLocation")) {
          p.properties.FairwayLocation = utils.convertGeoToGoogle(p.properties.FairwayLocation)
        }
      }


      let l = p.properties.teeTemplateCenter.length
      for (let z = 0; z < l; z++) {
        // console.log("z->t", p.properties.teeTemplateCenter)
        theCourse.Features[zz].properties.teeTemplateCenter[z] = utils.convertGeoToGoogle(p.properties.teeTemplateCenter[z])
      }

      l = p.properties.greenTemplateCenter.length
      for (let z = 0; z < l; z++) {
        // console.log("z->g", p.properties.greenTemplateCenter)
        theCourse.Features[zz].properties.greenTemplateCenter[z] = utils.convertGeoToGoogle(p.properties.greenTemplateCenter[z])
      }

      l = p.properties.fairwayTemplateCenter.length
      for (let z = 0; z < l; z++) {
        theCourse.Features[zz].properties.fairwayTemplateCenter[z] = utils.convertGeoToGoogle(p.properties.fairwayTemplateCenter[z])
      }
    }
    console.log("yy-->", theCourse)
    this.setState({ holeConfig: h, aCourse: theCourse });
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

  handleCourseClearClick = () => {
    let h = utils.createHoleConfig()
    let na = JSON.parse(JSON.stringify(pcourse))

    this.setState({ holeConfig: h, theCourse: na })
  }

  handleHoleConfigChange = (h) => {
    this.setState( {holeConfig: h} )
  }
  handleSaveNHLClick = (holeConf) => {
    console.log("hh->", holeConf)
    let h = this.state.holeConfig
    h.noLocationProperties = JSON.parse(JSON.stringify(holeConf))

    this.setState({ holeConfig: h })
  }
  handleNoHoleLocationInfo = () => {
    this.setState({ showHoleEditor: false })
  }
  returnClick = () => {
    console.log("return clicked")

    this.setState({ showHoleEditor: true })
  }
  // ======================== render =========================
  render() {
    let deMap = null

    // console.log("a course-->", this.state.aCourse);
    let stSel = ""
    for (let j = 0; j < 18; j++) {

      if (this.state.selectedButtons[j] > 0) {
        stSel += (j + 1) + ","
      }
    }

    let API_KEY = "AIzaSyBjhjazSK1XalgXiY3gCp32hhkTZzGG67E"
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

          holeConfig={this.state.holeConfig.properties}
          dragMarker={(e, i) => { this.handleMarkerDrag(e, i) }}
          mapClick={(ll) => { this.handleMapClick(ll) }}
        >
        </HoleEditor>

      return (
        <div>
          <div>
            {deMap}
          </div>

          <div className="buttonGroupContainer" >
            <button onClick={(e) => this.handleHoleButtonClick(e, -1)} >All</button>
            <ButtonGroup
              selected={this.state.selectedButtons}
              handleHoleButtonClick={(k) => { this.handleHoleButtonClick(k) }}
            />
          </div>
          <div className="generalButtonContainer" >
            <GeneralButton key={996} name="Help" handleClick={this.handleHelpClick} />
            <GeneralButton key={997} name="Clear" handleClick={this.handleClearClick} />
            <GeneralButton key={998} name="Save Hole" handleClick={() => { this.handleSaveHoleConfigClick(this.state.holeConfig) }} />
            <GeneralButton key={999} name="Save Course" handleClick={() => { this.handleSaveCourseClick() }} />

            <input type="file"
              name="myFile"
              onChange={(e) => this.uploadFile(e)}
            />
            <GeneralButton key={1000} name="Clear Course" handleClick={() => this.handleCourseClearClick()} />
            <GeneralButton key={1009} name="No Hole Location Info" handleClick={() => this.handleNoHoleLocationInfo()} />
          </div>

          <div className="holeTeeContainer">
            <Locator ikey={991} name="Tee" type="tloc" handleClick={(e) => this.handleCourseObjClick('T', e)} />
            <Locator ikey={991} name="Tee_Tmpl1" type={"tTmp1"} handleClick={(e) => this.handleCourseObjClick('Tm1', e)} />
            <Locator ikey={991} name="Tee_Tmpl2" type={"tTmp2"} handleClick={(e) => this.handleCourseObjClick('Tm2', e)} />
            <Locator ikey={991} name="Tee_Tmpl3" type={"tTmp3"} handleClick={(e) => this.handleCourseObjClick('Tm3', e)} />
          </div>
          <div className="holeTeeContainer2">
            {/* <Locator iKey={891} name="Tee" type="tloc"  handleClick={(e) => this.handleCourseObjClick('T', e)}/> */}
            <Locator ikey={891} name="Tee_Tmpl4" type={"tTmp4"} handleClick={(e) => this.handleCourseObjClick('Tm4', e)} />
            <Locator ikey={891} name="Tee_Tmpl5" type={"tTmp5"} handleClick={(e) => this.handleCourseObjClick('Tm5', e)} />
            <Locator ikey={891} name="Tee_Tmpl6" type={"tTmp6"} handleClick={(e) => this.handleCourseObjClick('Tm6', e)} />
          </div>


          <div className="holeFairwayContainer">
            <Locator ikey={993} name="Fairway" type="lloc" handleClick={(e) => this.handleCourseObjClick("L", e)} />
            <Locator ikey={993} name="Fairway_Tmpl1" type={"lTmp1"} handleClick={(e) => this.handleCourseObjClick("Lm1", e)} />
            <Locator ikey={993} name="Fairway_Tmpl2" type={"lTmp2"} handleClick={(e) => this.handleCourseObjClick("Lm2", e)} />
            <Locator ikey={993} name="Fairway_Tmpl3" type={"lTmp3"} handleClick={(e) => this.handleCourseObjClick("Lm3", e)} />
          </div>
          <div className="holeFairwayContainer2">
            {/* <Locator ikey={893} name="Fairway" type="lloc" handleClick={(e) => this.handleCourseObjClick("L", e)}/> */}
            <Locator ikey={893} name="Fairway_Tmpl4" type={"lTmp4"} handleClick={(e) => this.handleCourseObjClick("Lm4", e)} />
            <Locator ikey={893} name="Fairway_Tmpl5" type={"lTmp5"} handleClick={(e) => this.handleCourseObjClick("Lm5", e)} />
            <Locator ikey={893} name="Fairway_Tmpl6" type={"lTmp6"} handleClick={(e) => this.handleCourseObjClick("Lm6", e)} />
          </div>

          <div className="holeGreenContainer">
            <Locator ikey={992} name="Green" type="floc" handleClick={(e) => this.handleCourseObjClick("F", e)} />
            <Locator ikey={992} name="Green_Tmpl1" type={"fTmp1"} handleClick={(e) => this.handleCourseObjClick("Fm1", e)} />
            <Locator ikey={992} name="Green_Tmpl2" type={"fTmp2"} handleClick={(e) => this.handleCourseObjClick("Fm2", e)} />
            <Locator ikey={992} name="Green_Tmpl3" type={"fTmp3"} handleClick={(e) => this.handleCourseObjClick("Fm3", e)} />
          </div>
          <div className="holeGreenContainer2">
            {/* <Locator ikey={992} name="Green" type="floc"  handleClick={(e) => this.handleCourseObjClick("F", e)}/> */}
            <Locator ikey={992} name="Green_Tmpl4" type={"fTmp4"} handleClick={(e) => this.handleCourseObjClick("Fm4", e)} />
            <Locator ikey={992} name="Green_Tmpl5" type={"fTmp5"} handleClick={(e) => this.handleCourseObjClick("Fm5", e)} />
            <Locator ikey={992} name="Green_Tmpl6" type={"fTmp6"} handleClick={(e) => this.handleCourseObjClick("Fm6", e)} />
          </div>

          <div className="footer">
            <div className={"WhichHole"} >
              <label id="debugt" >{this.state.whichPos}</label>
              <label id="debugc" >{
                stSel
              }</label>
            </div>
            <textarea id="help" rows="25" cols="200" ></textarea>
          </div>
        </div>
      )
    } else {
      console.log("lj->", this.state.holeConfig)
      return (
        <NoHoleLocation
          initialRegion={this.state.initialRegion}
          url={url}
          initialFairway={this.state.holeConfig.properties.FairwayLocation}
          holeConfig={this.state.holeConfig}
          handleHoleConfigChange={(h) => this.handleHoleConfigChange(h)}
          handleSaveClick={(h) => this.handleSaveHoleConfigClick(h)}
          handleReturnClick={() => this.returnClick()}
        />
      )

    }
  }
}

export default App;
