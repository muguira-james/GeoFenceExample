import React from 'react';

import './App.css';

import HoleEditor from './HoleEditor'
import Locator from './Locator'
import GeneralButton from './GeneralButton'
import ButtonGroup from './ButtonGroup'

import utils from './utils'

export default class NoHoleLocation extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      whichPos: "L",
      fairwayLocation: props.FairwayLocation,
    }
    
    console.log("NHL: props->", props)
  }

  handleCourseObjClick(which, e) {
    // console.log("which", which, e)
    document.getElementById("Fairway").style.background = '#ffffff'

    document.getElementById("Fairway_Tmpl1").style.background = '#ffffff'
    document.getElementById("Fairway_Tmpl2").style.background = '#ffffff'
    document.getElementById("Fairway_Tmpl3").style.background = '#ffffff'

    document.getElementById("Fairway_Tmpl4").style.background = '#ffffff'
    document.getElementById("Fairway_Tmpl5").style.background = '#ffffff'
    document.getElementById("Fairway_Tmpl6").style.background = '#ffffff'

    document.getElementById("Fairway_Tmpl7").style.background = '#ffffff'
    document.getElementById("Fairway_Tmpl8").style.background = '#ffffff'
    document.getElementById("Fairway_Tmpl9").style.background = '#ffffff'

    switch(which) {

      case "L": {
        document.getElementById('Fairway').style.background = '#00ff00'
        this.setState({whichPos: "L"})
        break;
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
      case "Lm4": {
        document.getElementById("Fairway_Tmpl4").style.background = '#00ff00'
        this.setState({whichPos: "Lm4"}); 
        break
      }
      case "Lm5": {
        document.getElementById("Fairway_Tmpl5").style.background = '#00ff00'
        this.setState({whichPos: "Lm5"}); 
        break
      }
      case "Lm6": {
        document.getElementById("Fairway_Tmpl6").style.background = '#00ff00'
        this.setState({whichPos: "Lm6"}); 
        break
      }
      case "Lm7": {
        document.getElementById("Fairway_Tmpl7").style.background = '#00ff00'
        this.setState({whichPos: "Lm7"}); 
        break
      }
      case "Lm8": {
        document.getElementById("Fairway_Tmpl8").style.background = '#00ff00'
        this.setState({whichPos: "Lm8"}); 
        break
      }
      case "Lm9": {
        document.getElementById("Fairway_Tmpl9").style.background = '#00ff00'
        this.setState({whichPos: "Lm9"}); 
        break
      }
      default: {
        console.log("handlCourseObjClick: you should NEVER Be here!!!", which)
      }
    }
  }


  handleMapClick(latLng) {
    
    let geometry = {}
    geometry.lat = latLng.lat()
    geometry.lng = latLng.lng()
    let sg = JSON.stringify(geometry)


    switch(this.state.whichPos) {
      case "L": {
        let h = JSON.parse(JSON.stringify(this.props.holeConfig))
        console.log("kl->", this.props.holeConfig)
        h.noLocationProperties.FairwayLocation = utils.fillInFairwayInfo(geometry, '#')
        this.props.handleHoleConfigChange(h)
        document.getElementById("lloc").value = sg
        break
      }
      case "Lm1": {
        let h = JSON.parse(JSON.stringify(this.props.holeConfig)) 
        h.noLocationProperties.fairwayTemplateCenter1 = utils.fillInFairwayInfo(geometry, 'A')
        this.props.handleHoleConfigChange(h)
        document.getElementById("lTmp1").value = sg
        break
      }
      case "Lm2": {
        let h = JSON.parse(JSON.stringify(this.props.holeConfig)) 
        h.noLocationProperties.fairwayTemplateCenter2 = utils.fillInFairwayInfo(geometry, "B")
        this.props.handleHoleConfigChange(h)
        document.getElementById("lTmp2").value = sg
        break
      }
      case "Lm3": {
        let h = JSON.parse(JSON.stringify(this.props.holeConfig)) 
        h.noLocationProperties.fairwayTemplateCenter3 = utils.fillInFairwayInfo(geometry, 'C')
        this.props.handleHoleConfigChange(h)
        document.getElementById("lTmp3").value = sg
        break
      }
      case "Lm4": {
        let h = JSON.parse(JSON.stringify(this.props.holeConfig)) 
        h.noLocationProperties.fairwayTemplateCenter4 = utils.fillInFairwayInfo(geometry, 'D')
        this.props.handleHoleConfigChange(h)
        document.getElementById("lTmp4").value = sg
        break
      }
      case "Lm5": {
        let h = JSON.parse(JSON.stringify(this.props.holeConfig)) 
        h.noLocationProperties.fairwayTemplateCenter5 = utils.fillInFairwayInfo(geometry, 'E')
        this.props.handleHoleConfigChange(h)
        document.getElementById("lTmp5").value = sg
        break
      }
      case "Lm6": {
        let h = JSON.parse(JSON.stringify(this.props.holeConfig)) 
        h.noLocationProperties.fairwayTemplateCenter6 = utils.fillInFairwayInfo(geometry, 'F')
        this.props.handleHoleConfigChange(h)
        document.getElementById("lTmp6").value = sg
        break
      }
      case "Lm7": {
        let h = JSON.parse(JSON.stringify(this.props.holeConfig)) 
        h.noLocationProperties.fairwayTemplateCenter7 = utils.fillInFairwayInfo(geometry, 'G')
        this.props.handleHoleConfigChange(h)
        document.getElementById("lTmp7").value = sg
        break
      }
      case "Lm8": {
        let h = JSON.parse(JSON.stringify(this.props.holeConfig)) 
        h.noLocationProperties.fairwayTemplateCenter8 = utils.fillInFairwayInfo(geometry, 'H')
        this.props.handleHoleConfigChange(h)
        document.getElementById("lTmp8").value = sg
        break
      }
      case "Lm9": {
        let h = JSON.parse(JSON.stringify(this.props.holeConfig)) 
        h.noLocationProperties.fairwayTemplateCenter9 = utils.fillInFairwayInfo(geometry, 'I')
        this.props.handleHoleConfigChange(h)
        document.getElementById("lTmp9").value = sg
        break
      }
      default: { console.log("NHL: handleMapClick: you should not be here! ", this.state.whichPos)}
    }
    
  }

  handleMarkerDrag(e, mr) {
    console.log("marker drag", mr, e.latLng.lat(), e.latLng.lng())
    let geometry = {}
    geometry.lat = e.latLng.lat()
    geometry.lng = e.latLng.lng()

    let h = this.props.holeConfig
    switch (mr) {
      case "fairwayTemplateCenter1": { 
        h.noLocationProperties.fairwayTemplateCenter1 = geometry; 
        document.getElementById("lTmp1").value = JSON.stringify(geometry)
        break 
      }
      case "fairwayTemplateCenter2": { 
        h.noLocationProperties.fairwayTemplateCenter2 = geometry; 
        document.getElementById("lTmp2").value = JSON.stringify(geometry)
        break 
      }
      case "fairwayTemplateCenter3": { 
        h.noLocationProperties.fairwayTemplateCenter3 = geometry; 
        document.getElementById("lTmp3").value = JSON.stringify(geometry)
        break 
      }
      case "fairwayTemplateCenter4": { 
        h.noLocationProperties.fairwayTemplateCenter4 = geometry; 
        document.getElementById("lTmp4").value = JSON.stringify(geometry)
        break 
      }
      case "fairwayTemplateCenter5": { 
        h.noLocationProperties.fairwayTemplateCenter5 = geometry; 
        document.getElementById("lTmp5").value = JSON.stringify(geometry)
        break 
      }
      case "fairwayTemplateCenter6": { 
        h.noLocationProperties.fairwayTemplateCenter6 = geometry; 
        document.getElementById("lTmp6").value = JSON.stringify(geometry)
        break 
      }
      case "fairwayTemplateCenter7": { 
        h.noLocationProperties.fairwayTemplateCenter7 = geometry; 
        document.getElementById("lTmp7").value = JSON.stringify(geometry)
        break 
      }
      case "fairwayTemplateCenter8": { 
        h.noLocationProperties.fairwayTemplateCenter8 = geometry; 
        document.getElementById("lTmp8").value = JSON.stringify(geometry)
        break 
      }
      case "fairwayTemplateCenter9": { 
        h.noLocationProperties.fairwayTemplateCenter8 = geometry; 
        document.getElementById("lTmp9").value = JSON.stringify(geometry)
        break 
      }
      default: {console.log("you should not be here: handlDragMarker", mr)}
    }
    // console.log("h->", h)
    this.props.handleHoleConfigChange(h)
  }
  

  onMapMounted = (ref) => {
    // console.log("map is mounted", ref)
    this.map = ref
  }

  render = () => {
    
    console.log("ll->" , this.props.holeConfig)


    let deMap = 
      <HoleEditor
          key={590}
          isMarkerShown
          onMapMounted={this.onMapMounted}
          region={this.props.initialRegion}
          googleMapURL={this.props.url}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}

          holeConfig={this.props.holeConfig.noLocationProperties}
          dragMarker={(e, i) => {this.handleMarkerDrag(e, i)}}
          mapClick={(ll) => {this.handleMapClick(ll)}}
      >
      </HoleEditor>
    return (
      
      <div className="noHoleContainer" >
        <div>
            {deMap}
        </div>

        <div className="buttonGroupContainer" >
          <button onClick={(e) => this.props.handleHoleButtonClick(e, -1)} >All</button>
          <ButtonGroup
            selected={this.props.selectedButtons}
            handleHoleButtonClick={(k) => { this.handleHoleButtonClick(k) }}
          />
        </div>
        <div className="generalButtonContainer" >
          <GeneralButton key={998} name="Save Hole" handleClick={() => { this.props.handleSaveClick(this.props.holeConfig) }} />
          <GeneralButton key={1009} name="Return" handleClick={() => {this.props.handleReturnClick()}} />
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

        <div className="holeFairwayContainer3">
          <Locator ikey={893} name="Fairway_Tmpl7" type={"lTmp7"} handleClick={(e) => this.handleCourseObjClick("Lm7", e)} />
          <Locator ikey={893} name="Fairway_Tmpl8" type={"lTmp8"} handleClick={(e) => this.handleCourseObjClick("Lm8", e)} />
          <Locator ikey={893} name="Fairway_Tmpl9" type={"lTmp9"} handleClick={(e) => this.handleCourseObjClick("Lm9", e)} />
        </div>

        
      </div>
    
    )
    document.getElementById('lloc').value = JSON.stringify(this.props.holeConfig.FairwayLocation)
  }
}