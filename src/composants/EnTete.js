import React from 'react'
import "./EnTete.css"

const affichage = {
  "en" : {
    "nb_vic" : " Win count = ",
    "nb_def" : " Loss count = ",
  },
  "fr" : {
    "nb_vic" : " Nombre de victoires = ",
    "nb_def" : " Nombre de défaites = ",
  }
}

const messages = {
  "en" : {
    "drapeau" : "Click to change langage",
    "rafraichir" : "Click to refresh",
    "score" : "Your actual score"
  },
  "fr" : {
    "drapeau" : "Cliquer pour changer de langue",
    "rafraichir" : "Cliquer pour rafraichir",
    "score" : "Score actuel"
  }
}

class EnTete extends React.Component{
  constructor(props){
    super(props)
    this.us = require("./img/US_flag.jpg")
    this.fr = require("./img/Fr_flag.jpg")
    this.state = {lang : this.fr}
  }

  componentDidMount(){
    this.lang.addEventListener("click", () => {
      this.setState({lang : (this.state.lang === this.fr) ? this.us : this.fr})

      // appeler la fonction de changement de langue de l'appli
      this.props.changer_lang()
    })

    this.rafraichir.addEventListener("click", () => {
      this.props.rafraichir()
    })
  }

  render(){
    return(
      <div id="en_tete">
      <img ref={elt => this.rafraichir = elt} id="reset" src={require("./img/reset.png")}
                        alt="Rafraichir" title={messages[this.props.lang].rafraichir}/>
        <p title={messages[this.props.lang].score}>
          {affichage[this.props.lang].nb_vic + this.props.score.victoire}
            |{affichage[this.props.lang].nb_def + this.props.score.perdu}</p>
        <img ref={elt => this.lang = elt} id="langage" src={this.state.lang}
                          alt="Changer langue" title={messages[this.props.lang].drapeau}/>
      </div>

    )
  }
}


export default EnTete
