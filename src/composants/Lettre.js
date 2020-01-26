import React from 'react'
import './Lettre.css'

class Lettre extends React.Component{
  constructor(props){
    super(props)
    this.state = {coul : "red", deja_jouee : false}
    this.lettre = this.props.lettre
  }

  reinit = () => {this.setState({coul : "red", deja_jouee : false})}

  // si la souris passe au dessus de la touche et qu'elle n'a jamais été cliquée
  // on ajoute un petit effet
  gerer_mouse_over(){
    if (!this.state.deja_jouee){
      this.setState({coul : "blue"})
    }else{}
  }
  // si la souris sort de la touche et qu'elle n'a jamais été cliquée
  // on ajoute un petit effet
  gerer_mouse_out(){
    if (!this.state.deja_jouee){
      this.setState({coul : "red"})
    }else{}
  }

  gerer_clic(verification){
    // vérifier si la lettre a déjà été jouée
    if(!this.state.deja_jouee){
      // en cas de clic on vérifie si cette lettre est dans le mot recherché
      var [est_dans_mot, fini] = verification(this.lettre)

      if(est_dans_mot && !fini){
        // fini indique si le mot a été trouvé ou si le joueur a perdu
        // si c'est fini, inutile de colorier en gris la lettre
        this.setState({coul : "grey", deja_jouee : true})
      }else if(!est_dans_mot && !fini){
        this.setState({coul : "grey", deja_jouee : true})
      }
    }else{}
  }

  // pour ajouter un gestionnaire d'évènements on doit attendre que la lettre soit
  // présente dans le DOM
  componentDidMount(){
    this.elt.addEventListener('mouseover', () => {this.gerer_mouse_over()})
    this.elt.addEventListener('mouseout', () => {this.gerer_mouse_out()})
    this.elt.addEventListener('click', () => {this.gerer_clic(this.props.verification)})
  }

  render(){
    return(
    // ref: permet d'ajouter une fonction de callback (fonction appelée à la fin
    // d'une autre fonction)
    <div ref={elt => this.elt = elt} style = {{backgroundColor: this.state.coul}}
                                        className = "lettre">{this.lettre}</div>
  )}

}

export default Lettre
