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

var initialCenter = { lat: 36.296168, lng: -94.198221 }

var convertGeoToGoogle = (latLng) => {
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
      aCourse: pcourse,
      holeConfig: { properties: {} },
      selectedButtons: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    }
  }
  

 




  handleCourseObjClick(which, e) {
    // console.log("which", which, e)
    document.getElementById("Tee").style.background = '#ffffff'
    document.getElementById("Green").style.background = '#ffffff'
    document.getElementById("Fairway").style.background = '#ffffff'
    document.getElementById("Tee_Tmpl").style.background = '#ffffff'
    document.getElementById("Green_Tmpl").style.background = '#ffffff'
    document.getElementById("Fairway_Tmpl").style.background = '#ffffff'

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
      case "Tm": {
        document.getElementById("Tee_Tmpl").style.background = '#00ff00'
        this.setState({whichPos: "Tm"}); 
        break
      }
      case "Fm": {
        document.getElementById("Green_Tmpl").style.background = '#00ff00'
        this.setState({whichPos: "Fm"}); 
        break
      }
      case "Lm": {
        document.getElementById("Fairway_Tmpl").style.background = '#00ff00'
        this.setState({whichPos: "Lm"}); 
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
    document.getElementById("tTmp").value = ""
    document.getElementById("fTmp").value = ""
    document.getElementById("lTmp").value = ""

    document.getElementById("Tee").style.background = '#ffffff'
    document.getElementById("Green").style.background = '#ffffff'
    document.getElementById("Fairway").style.background = '#ffffff'
    document.getElementById("Tee_Tmpl").style.background = '#ffffff'
    document.getElementById("Green_Tmpl").style.background = '#ffffff'
    document.getElementById("Fairway_Tmpl").style.background = '#ffffff'

    document.getElementById("Tee").style.background = '#00ff00'
    this.setState({whichPos: "T"}); 
  }

  handleSaveCourseClick = () => {
    
    let theCourse = JSON.parse(JSON.stringify(this.state.aCourse))
    theCourse.Features.forEach((p) => {
      
      if ("TeeLocation" in p.properties) {
        p.properties.TeeLocation = convertGeoFromGoogle(p.properties.TeeLocation)
      }
      
      if ("FlagLocation" in p.properties) {
        p.properties.FlagLocation = convertGeoFromGoogle(p.properties.FlagLocation)
      }
     
      if ("fairwayLocation" in p.properties) {
        p.properties.fairwayLocation = convertGeoFromGoogle(p.properties.fairwayLocation)
      }
      
      if ("teeTemplateCenter" in p.properties) {
        p.properties.teeTemplateCenter = []
        p.properties.teeTemplateCenter.push(convertGeoFromGoogle(p.properties.teeTemplateCenter))
        p.properties.teeTemplateCenter.push(convertGeoFromGoogle(p.properties.teeTemplateCenter))
        p.properties.teeTemplateCenter.push(convertGeoFromGoogle(p.properties.teeTemplateCenter))
      }

      if ("greenTemplateCenter" in p.properties) {
        p.properties.greenTemplateCenter = []
        p.properties.greenTemplateCenter.push(convertGeoFromGoogle(p.properties.greenTemplateCenter))
        p.properties.greenTemplateCenter.push(convertGeoFromGoogle(p.properties.greenTemplateCenter))
        p.properties.greenTemplateCenter.push(convertGeoFromGoogle(p.properties.greenTemplateCenter))
      }
      
      if ("fairwayTemplateCenter" in p.properties) {
        p.properties.fairwayTemplateCenter = []
        p.properties.fairwayTemplateCenter.push(convertGeoFromGoogle(p.properties.fairwayTemplateCenter))
        p.properties.fairwayTemplateCenter.push(convertGeoFromGoogle(p.properties.fairwayTemplateCenter))
        p.properties.fairwayTemplateCenter.push(convertGeoFromGoogle(p.properties.fairwayTemplateCenter))
      }

      if ("TeeLocation" in p.properties) {
        let num = p.properties.number
        p.properties.Par = 4
        p.properties.Yards = 345
        p.properties.image =  "Hole" + num + ".png"
        p.properties.page = "Hole" + num + ".html"
        p.properties.number = num+1
        p.properties.Tphoto = "./images/Tee2.png"
        p.properties.Flagphoto = "./images/Hole" + num + ".png"

        
        let content = JSON.stringify(theCourse, null, 2)
        console.log(content)
      }
    })
    
    
    

    
  }
  // 
  // the aCourse structure is sorted in numeric order on the "number" field
  handleSaveClick() {
    // console.log("aCou->", this.state.aCourse, this.state.whichHole) 

    // first make a copy
    let na = Object.assign({}, this.state.aCourse)
    // console.log("ooo--->", this.state.holeConfig)
    let o = {}
    o.type = "Feature"
    o.properties = {}
    o.properties.TeeLocation = this.state.holeConfig.properties.TeeLocation
    o.properties.FlagLocation = this.state.holeConfig.properties.FlagLocation
    o.properties.FairwayLocation = this.state.holeConfig.properties.FairwayLocation
    o.properties.teeTemplateCenter = this.state.holeConfig.properties.teeTemplateCenter
    o.properties.fairwayTemplateCenter = this.state.holeConfig.properties.fairwayTemplateCenter
    o.properties.greenTemplateCenter = this.state.holeConfig.properties.greenTemplateCenter
    o.properties.teeDrawingPattern = '3grp'
    o.properties.greenDrawingPattern = '3grp'
    o.properties.fairwayDrawingPattern = '3grp'
    o.properties.number = this.state.whichHole

    na.Features[o.properties.number] = o
    let sb = Object.assign({}, this.state.selectedButtons)
    sb[o.properties.number] = 1

    // console.log("na-->", na)
    this.setState( { aCourse: na, selectedButtons: sb })
  }

  handleMapClick(latLng) {

    let geometry = {}
    geometry.lat = latLng.lat()
    geometry.lng = latLng.lng()
    let sg = JSON.stringify(geometry)

    switch(this.state.whichPos) {
      case "T": {
        // this.setState({ teeLocation: geometry })
        let h = this.state.holeConfig
        h.properties.TeeLocation = geometry
        // console.log("h-->", h)
        this.setState( {holeConfig: h} )
        document.getElementById("tloc").value = sg
        break
      }
      case "F": {
        // this.setState( { greenLocation: geometry } )
        let h = this.state.holeConfig 
        h.properties.FlagLocation = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("floc").value = sg
        break
      }
      case "L": {
        // this.setState( { fairwayLocation: geometry } )
        let h = this.state.holeConfig
        h.properties.FairwayLocation = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("lloc").value = sg
        break
      }
      case "Tm": {
        // this.setState( { teeTemplateCenter: geometry } )
        let h = this.state.holeConfig 
        h.properties.teeTemplateCenter = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("tTmp").value = sg
        break
      }
      case "Fm": {
        // this.setState( { greenTemplateCenter: geometry } )
        let h = this.state.holeConfig 
        h.properties.greenTemplateCenter = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("fTmp").value = sg
        break
      }
      case "Lm": {
        // this.setState( { fairwayTemplateCenter: geometry } )
        let h = this.state.holeConfig 
        h.properties.fairwayTemplateCenter = geometry
        this.setState( {holeConfig: h} )
        document.getElementById("lTmp").value = sg
        break
      }
      default: { console.log("handleMapClick: you should not be here! ", this.state.whichPos)}
    }
    
  }

  handleMarkerDrag(e, mr) {
    // console.log("marker drag", mr, e)
    let geometry = []
    geometry.lat = e.latLng.lat()
    geometry.lng = e.latLng.lng()

    let h = this.state.holeConfig
    switch (mr) {
      case "TeeLocation": { h.properties.TeeLocation = geometry; break }
      case "FlagLocation": { h.properties.FlagLocation = geometry; break }
      case "FairwayLocation": { h.properties.fairwayLocation = geometry; break }
      case "teeTemplateCenter": { h.properties.teeTemplateCenter = geometry; break }
      case "greenTemplateCenter": { h.properties.greenTemplateCenter = geometry; break }
      case "fairwayTemplateCenter": { h.properties.fairwayTemplateCenter = geometry; break }
      default: {console.log("you should not be here: handlDragMarker", mr)}
    }
    // console.log("h->", h)
    this.setState( {holeConfig: h} )
  }
  
  handleHoleButtonClick(indx) {
    this.setState({ whichHole: indx })
    // console.log("indx", indx, this.state.aCourse)
    if (Object.keys(this.state.aCourse.Features[indx]).length > 0) {
      let h = this.state.holeConfig
      // console.log("tee-->", this.state.aCourse.Features[indx].properties)
      h.properties.TeeLocation = this.state.aCourse.Features[indx].properties.TeeLocation
      h.properties.FlagLocation = this.state.aCourse.Features[indx].properties.FlagLocation
      h.properties.FairwayLocation = this.state.aCourse.Features[indx].properties.FairwayLocation

      h.properties.teeTemplateCenter = this.state.aCourse.Features[indx].properties.teeTemplateCenter
      h.properties.greenTemplateCenter = this.state.aCourse.Features[indx].properties.greenTemplateCenter
      h.properties.fairwayTemplateCenter = this.state.aCourse.Features[indx].properties.fairwayTemplateCenter
      this.setState({holeConfig: h})
    }
  }

  //
  // initial file handling
  handleFileResult = () => {
    let theCourse = JSON.parse(fileReader.result);

    theCourse.Features.forEach((p) => {
      p.properties.TeeLocation = convertGeoToGoogle(p.properties.TeeLocation)
      p.properties.FlagLocation = convertGeoToGoogle(p.properties.FlagLocation)
      p.properties.fairwayLocation = convertGeoToGoogle(p.properties.fairwayLocation)
      p.properties.teeTemplateCenter = convertGeoToGoogle(p.properties.teeTemplateCenter)
      p.properties.greenTemplateCenter = convertGeoToGoogle(p.properties.greenTemplateCenter)
      p.properties.fairwayTemplateCenter = convertGeoToGoogle(p.properties.fairwayTemplateCenter)
    })
    console.log("yy-->", theCourse)
    this.setState({ aCourse: theCourse });
    this.handleHoleButtonClick(0)
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
  render() {
    let deMap = null
    
    console.log("a course-->", this.state.aCourse);
    let stSel = ""
    for (let j=0; j<18; j++) {
      
        if (this.state.selectedButtons[j] > 0) {
          stSel += (j + 1) + ","
        }
    }
    
      
    
    
    if (this.state.showHoleEditor) {
      deMap = 
          <HoleEditor
              key={990}
              isMarkerShown
              initialCenter={initialCenter}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDg2L3FSio2Ta-n-9L3sCMsBYziMflOFkY&v=3.exp&libraries=geometry,drawing,places"
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
        {deMap}
        <button onClick={(e) => this.handleHoleButtonClick(e, -1)} >All</button>
        <ButtonGroup 
          selected={this.state.selectedButtons} 
          handleHoleButtonClick={(k) => {this.handleHoleButtonClick(k)}}
        />

        <GeneralButton key={997} name="Clear" handleClick={this.handleClearClick} />
        <GeneralButton key={998} name="Save Hole" handleClick={() => {this.handleSaveClick()}} />
        <GeneralButton key={999} name="Save Course" handleClick={() => {this.handleSaveCourseClick()}} />
        
        <input type="file" 
          name="myFile"
          onChange={(e) => this.uploadFile(e)} 
        />
        <Locator ikey={991} name="Tee" type="tloc"  handleClick={(e) => this.handleCourseObjClick('T', e)}/>
        <Locator ikey={991} name="Tee_Tmpl" type={"tTmp"}  handleClick={(e) => this.handleCourseObjClick('Tm', e)}/>

        <Locator ikey={992} name="Green" type="floc"  handleClick={(e) => this.handleCourseObjClick("F", e)}/>
        <Locator ikey={992} name="Green_Tmpl" type={"fTmp"} handleClick={(e) => this.handleCourseObjClick("Fm", e)}/>
        
        <Locator ikey={993} name="Fairway" type="lloc" handleClick={(e) => this.handleCourseObjClick("L", e)}/>
        <Locator ikey={993} name="Fairway_Tmpl" type={"lTmp"} handleClick={(e) => this.handleCourseObjClick("Lm", e)}/>

        <label id="debugt" >{this.state.whichPos}</label>
        <label id="debugc" >{
          stSel
        }</label>
      </div>
    )
  }
}

export default App;
