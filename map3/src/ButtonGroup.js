
import React from 'react';



class ButtonGroup extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        selected: props.selected,
      }
      this.holeMap = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17, 18]
      // console.log("bg-s->", props)
    }
  
    // shouldComponentUpdate(nextProps, nextState) {
    //   return true
    // }
    handleClick(kIndex) {
      
      let k = (kIndex + 1)
      // clear all the colors
      for (let j=0; j<18; j++) {
        let i = "h" + (j + 1)
        document.getElementById(i).style.background = '#ffffff'
        
      }
      let z = "h" + k
      // then set the one that we are working on
      document.getElementById(z).style.background = '#00ff00'
  
      this.props.handleHoleButtonClick(kIndex)
    }
  
    render=() => {
      let buttonList = this.holeMap.map((j, kIndex) => {
        let h="h" + (kIndex + 1)
        return (
          <button 
            key={kIndex} 
            className="buttonList" 
            id={h} 
            onClick={() => {this.handleClick(kIndex)}} >{j}</button>
        ) 
      })
      return (buttonList)
    }
  }

  export default ButtonGroup