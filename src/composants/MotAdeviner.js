import React from 'react'
import "./MotAdeviner.css"

class MotAdeviner extends React.Component{
  render(){
    return(
      <div id="mot_a_deviner">
        {this.props.liste_lettre.map((lettre, index) =>
            (<p key={index} className="lettreDeviner">{this.props.dic_jeu[lettre]}</p>))}
      </div>
    )
  }
}


export default MotAdeviner
