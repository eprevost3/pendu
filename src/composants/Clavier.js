import React from 'react'
import Lettre from './Lettre.js'
import './Clavier.css'

const lettres = ['A','Z','E','R','T','Y','U','I','O','P','Q','S',
                'D','F','G','H','J','K','L','M','W','X','C','V','B','N']

class Clavier extends React.Component{
  constructor(props){
    super(props)
    this.objets_lettres = []
    this.state = {"mtr_clavier" : true}
  }

  // méthode afficher le bouton et non le clavier
  mtr_bouton = () => {this.setState({"mtr_clavier" : false})}

  render(){
    if(this.state.mtr_clavier){
      this.objets_lettres = []
      return(
        <div className = "clavier">
          {lettres.map((l, index) => (<Lettre ref={(lettre) =>
            {if(lettre != null){this.objets_lettres.push(lettre)}}}
            lettre = {l} key = {index} verification = {this.props.verification}/>))}
        </div>
      )
    }else{
      return(
        <div>
          <button type="button" onClick={() => {this.setState({"mtr_clavier" : true})}}>Go !</button>
        </div>
      )
    }
  }
}

export default Clavier
