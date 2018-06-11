/**
 * basic course config tool
 */

import React, { Component } from 'react';


import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import GeneralButton from './GeneralButton';
import HoleNum from './HoleNum';
import Locator from './Locator';
import OutLinePointsDisplay from './OutLinePointsDisplay';
// import PickCourseFile from './PickCourseFile';

// import {holeElement} from './utils';

// this little function just makes elements.
function _elm(location, url) {
  this.location = location
  this.icon = {}
  this.icon.url = url
  this.icon.scaledSize = new window.google.maps.Size(20,20);
}

// var aCourse = null;

let fileReader = new FileReader()


export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cntlState: 'T',
      markers: [],
      aCourse: {"Features":[]},
    }
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleCourseObjClick = this.handleCourseObjClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
  }

  handleFileResult = (e) => {
    // const aCourse = fileReader.result;
    this.setState({aCourse: JSON.parse(fileReader.result) })

    // console.log("a course-->", this.state.aCourse)

  }
  uploadFile(event) {
      let file = event.target.files[0];
      
      
      if (file) {
        
        fileReader.onloadend = this.handleFileResult;
        fileReader.readAsText(file)
        

        // console.log("file = -->", aCourse);
        // axios.post('/files', data)...
      }
  }

  handleClearClick() {
    document.getElementById('tloc').value = ""
    document.getElementById('floc').value = ""
    document.getElementById('lloc').value = ""
    document.getElementById('outLP').value = ""
  }
  // change me!!!
  //
  // Right now: I do the following:
  // Save: pull all the data from the UI and create a json struct for 1 hole
  //
  // This could fill a text area with hole info for further editing OR
  // this could save the json directly to a file.
  //
  // this function has been debugged (I just cut/paste it from old module)!
  handleSaveClick() {
    var tloc, floc, lloc, hnumData, mlayout = null;

    if (document.getElementById('tloc').value != null) {
      tloc = document.getElementById('tloc').value;
    } else {
      tloc = "( 0, 0 )"
    }
    if (document.getElementById('floc').value != null) {
      floc = document.getElementById('floc').value;
    } else {
      floc = "(0, 0)"
    }
    if (document.getElementById('lloc').value != null) {
      lloc = document.getElementById('lloc').value;
    } else {
      lloc = "(0, 0)"
    }
    if (document.getElementById('holeID').value != null) {
      hnumData = document.getElementById('holeID').value;
    } else {
      hnumData = "(0, 0)"
    }
    if (document.getElementById('outLP').value != null) {
      mlayout = document.getElementById('outLP').value;
    } else {
      mlayout = "(0, 0)"
    }

    var t = {}
    t.type = "Feature";
    t.properties = {};

    t.properties.image = "Hole" + hnumData + ".png";
    t.properties.page = "Hole" + hnumData + ".html";
    t.properties.number = hnumData;

    t.properties.Tphoto = "./images/Tee2.png";
    t.properties.Flagphoto = "./images/Hole" + hnumData + ".png";
    t.properties.TeeLocation = JSON.parse(tloc);
    t.properties.FlagLocation = JSON.parse(floc);
    t.properties.labelLocation = JSON.parse(lloc);

    t.properties.teeTemplateCenter = JSON.parse(tloc);
    t.properties.greenTemplateCenter = JSON.parse(floc);
    t.properties.fairwayTemplateCenter = JSON.parse(lloc);

    t.properties.holeCenter = JSON.parse(lloc);

    // t.properties.LayoutCoordinates = {};
    // t.properties.LayoutCoordinates.type = "Feature";
    // t.properties.LayoutCoordinates.properties = {};
    // t.properties.LayoutCoordinates.properties.name = "LineCoordinates";
    // t.properties.LayoutCoordinates.geometry = {};
    // t.properties.LayoutCoordinates.geometry.type = "LineString";
    // t.properties.LayoutCoordinates.geometry.coordinates = "[ " + mlayout + " ]";

    var outp = JSON.stringify(t, null, 2);
    console.log("------>",outp);
    document.getElementById('outLPD').value = outp;
  }

  // clicking on a map puts me in 1 of several states:
  // T click adds the Tee location
  // Flag click add the flag
  // Label sets the center of the hole
  handleMapClick(mapProps, map, evnt) {

    // turn the click into a ( lat, lng ) pair
    var geo = new window.google.maps.LatLng(evnt.latLng.lat(), evnt.latLng.lng())
    var geometry = {}
    geometry.latitude = geo.lat()
    geometry.longitude = geo.lng()
    // console.log("geo = ", JSON.stringify(geometry), this.state.cntlState);

    switch (this.state.cntlState) {
      case "T":
        {
          document.getElementById('tloc').value = JSON.stringify(geometry);
          let elm = new _elm(geo, "./Tee1.png");
          this.setState({markers: [...this.state.markers, elm]})
          break;
        }
      case "F":
        {
          document.getElementById('floc').value = JSON.stringify(geometry);
          let elm = new _elm(geo, './Flag.png');
          this.setState({markers: [...this.state.markers, elm]})
          break;
        }
      case "L":
        {
          document.getElementById('lloc').value = JSON.stringify(geometry);
          let elm = new _elm(geo, './Fan.png');
          this.setState({markers: [...this.state.markers, elm]})
          break;
        }
      case "M": // this has not bee implemented yet, add a mask around the hole
        {
          var it = document.getElementById('outLP').value;
          if (it === "") {
            it = it + geometry + "\n";
          } else {
            it = it + ', ' + geometry + "\n";
          }
          document.getElementById('outLP').value = it;
          break;
        }

      default:
        break;

    }
    // for final product this markers array will be array of course eleements
    console.log("markers=", this.state.markers)
  }

  // handle tee, flag and center of hole indicator clicks
  handleCourseObjClick(typ, e) {
    console.log("CO click", typ, e)
    this.setState({ cntlState: typ} );
  }

  // handleReadCourseFile(e) {
  //   // console.log("in handle read file")
  //   let fileName = e.target.value.split('\\')[2]
  //   console.log("in handle read file:", __dirname, path, fileName)
  //   let r = fs.readFile(fileName, function read(err, data) {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log("data-->", data, r)
  //     this.setState( {course: data} )
  //   })
  //   // console.log("PCF", )
  // }
  // show me the controls
  render() {
    return (
      <div className="GMap">

        <HoleNum />
        {/* <PickCourseFile handleReadCourseFile={this.handleReadCourseFile}/> */}
        <input type="file" 
          name="myFile"
          onChange={(e) => this.uploadFile(e)} 
        />
        <GeneralButton name="clear" handleClick={this.handleClearClick} />
        <GeneralButton name="Save" handleClick={this.handleSaveClick} />
        <GeneralButton name="Mask" handleClick={this.handleMaskClick} />

        <Locator name="Tee" type="tloc" handleClick={(e) => this.handleCourseObjClick('T', e)}/>
        <Locator name="Flag" type="floc" handleClick={(e) => this.handleCourseObjClick("F", e)}/>
        <Locator name="label" type="lloc" handleClick={(e) => this.handleCourseObjClick("L", e)}/>

        <div className='UpdatedText'>
          <p>Current Zoom: { this.state.zoom }</p>
          <p>Cntl State: {this.state.cntlState}</p>
        </div>

        <div>
          <Map
            google={this.props.google}
            initialCenter={this.props.initialCenter}
            mapType={this.props.mapType}
            zoom={this.props.zoomLevel}
            onClick={this.handleMapClick}
            >
            {
              this.state.aCourse.Features.map((mr, keyIndex) => {
              // this.state.markers.map((mr, keyIndex) => {
                let lat=mr.properties.TeeLocation.latitude 
                let lng = mr.properties.TeeLocation.longitude
                let icon = { url: "../public/Tee1.png",
                          }
                console.log("ma=", mr.properties.number, mr.properties.TeeLocation);
                return (
                  <Marker          
                    key={mr.properties.number}
                    position={{ lat: lat, lng: lng}}
                    />
                )
              })
            }

          </Map>
        </div>
        <OutLinePointsDisplay textArea="outLP" />
        <OutLinePointsDisplay textArea="outLPD"/>
      </div>
    );
  }
}

// this is my API key - use your own!!
export default GoogleApiWrapper({
  apiKey: "AIzaSyDg2L3FSio2Ta-n-9L3sCMsBYziMflOFkY"
})(MapContainer)
