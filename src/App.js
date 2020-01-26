import React from 'react';
import update from 'react-addons-update'; // ES6
import './App.css';
import Clavier from './composants/Clavier.js'
import EnTete from './composants/EnTete.js'
import MotAdeviner from './composants/MotAdeviner.js'
import Dessin from './composants/Dessin.js'

var mots = {
  "fr" : ["LAPIN", "CIRQUE", "BATEAU", "VOITURE", "RASSEMBLEMENT", "QUARTIER",
          "ECOLE", "BALEINE", "CLAVIER", "TEMPETE", "DEFENSE", "TRAVAIL", "RAPACE",
          "LIVRE"],
  "en" : ["CAR", "BOAT", "NEIGHBOR", "COLOR", "MEMORIZE", "ORGANIZE", "PLANE",
          "BUILDING", "PARK", "THEATER", "KEYBOARD", "PIANO", "YELLOW", "ARTIST"]
}

const messages = {
  "fr" : {
    "perdu" : "Perdu !!",
    "gagne" : "Gagné !!",
    "plus_mots" : "Il n'y a plus de mots à deviner ! F5 pour recommencer"
  },
  "en" : {
    "perdu" : "You lost!!",
    "gagne" : "You won!!",
    "plus_mots" : "No more words to guess! F5 to start again"
  }
}


class App extends React.Component{
  constructor(props){
    super(props)
    this.essais_restants = 10
    this.state = this.init_state()

    // initialisation des objets qui représentent les différents composants graphique
    this.en_tete = undefined
    this.mot_a_deviner = undefined
    this.clavier = undefined
    this.dessin = undefined
  }

  // initialisation du state global de notre appli. Il contrôle l'intégralité
  // des variables
  init_state(){
    var _state = {}
    _state["reinit"] = false
    _state["lang"] = "fr"

    // pas d'utilisation du setState parce qu'on ne veut rien rerendre pour l'instant
    _state["mot_a_deviner"] = this.recup_nouv_mot(mots[_state["lang"]])
    // initialisation de la partie du state contenant la liste des lettres à deviner
    // (pratique) + état de l'avancement de la découverte des lettres du mot
    var [dic_jeu, liste_lettre] = this.constructor.obt_liste_et_lettres(_state["mot_a_deviner"])
    _state["dic_jeu"] = dic_jeu
    _state["liste_lettre"] = liste_lettre
    _state["score"] = {"victoire" : 0, "perdu" : 0}

    return(_state)
  }

  static nb_lettres_uniques(mot){
    var compte = 0
    for(var k = 0; k < mot.length; k++){
      var premier = mot.indexOf(mot[k])

      if(premier === k){compte += 1}
      else{}
    }
    return(compte)
  }

  // crée des objets utiles pour la suite: la liste de toutes les lettres du mot à
  // deviner, un dictionnaire indiquant les lettres trouvées et non trouvées
  static obt_liste_et_lettres(mot){
    var dic_jeu = {lettres_a_dev : App.nb_lettres_uniques(mot)}, liste_lettre = []

    for(var k = 0; k < mot.length; k++){
      dic_jeu[mot[k]] = "_"
      liste_lettre.push(mot[k])
    }
    return([dic_jeu, liste_lettre])
  }

  recup_nouv_mot(liste_mots){
    var n = liste_mots.length, nouv_mot = ""

    if(n === 0){

      alert(messages[this.state.lang]["plus_mots"])
      return(0)
    }else{
      var k = Math.floor(Math.random() * n)
      nouv_mot = liste_mots[k]

      // retirer le mot de la liste
      liste_mots.splice(k, 1)
    }
    return(nouv_mot)
  }

  // gestion de la défaite
  defaite = () => {
    alert(messages[this.state.lang].perdu)

    // màj des scores
    this.setState({score : update(this.state.score,
                          {"perdu" : {$set : this.state.score.perdu + 1}})})

    // nouveau mot à deviner
    this.rafraichir();

    // un bouton apparait à la place du clavier
    this.clavier.mtr_bouton()
  }

  victoire = () => {
    alert(messages[this.state.lang].gagne)

    // màj des scores
    this.setState({score : update(this.state.score,
                          {"victoire" : {$set : this.state.score.victoire + 1}})})

    // nouveau mot à deviner
    this.rafraichir()

    // un bouton apparait à la place du clavier
    this.clavier.mtr_bouton()
  }

  // changer la langue d'utilisation
  changer_lang = () => {this.rafraichir(this.state.lang === "fr" ? "en" : "fr")}

  // rafraichir le clavier, le dessin, changer de mot sans pour autant réinitialiser
  // le score.
  // ajout d'un binding
  rafraichir = (lang = this.state.lang) => {
    // appel du constructor pour pouvoir utiliser les fonctions statiques
    var mot = this.recup_nouv_mot(mots[lang])
    var [dic_jeu, liste_lettre] = this.constructor.obt_liste_et_lettres(mot)
    this.setState({
      "lang" : lang,
      "mot_a_deviner" : mot,
      "dic_jeu" : dic_jeu,
      "liste_lettre" : liste_lettre,
      "reinit" : true,
    })

    // effacer le dessin
    this.dessin.effacer()
    // remettre à 0 le nombre d'essais
    this.essais_restants = 10

    this.clavier.objets_lettres.map((lettre) => (lettre.reinit()))
  }


  // vérifier si la lettre que l'on a cliquée est dans le mot à atteindre
  // binding du this
  jouer_lettre = (lettre) => {
    var est_dedans = this.state.mot_a_deviner.includes(lettre), fini = false

    if(est_dedans){
      // on appelle l'objet de la représentation  graphique mot_a_deviner
      // (récupéré lors de son render), on modifie son state pour le forcer à
      // remplacer les "_" par la lettre qui a été devinée

      this.setState({dic_jeu : update(this.state.dic_jeu, {[lettre] : {$set : lettre},
              "lettres_a_dev" : {$set : this.state.dic_jeu.lettres_a_dev - 1}})})

      if(this.state.dic_jeu.lettres_a_dev <= 0){
        this.victoire()
        // piège : on a gagné, on va changer de mot, donc on indique à la lettre
        // qu'elle n'est pas dans le mot
        fini = true
      }else{}

    }else{
      // le dessin du pendu est modifié
      this.dessin.dessiner(this.essais_restants)

      this.essais_restants -= 1
      // on vérifie si on a perdu ou pas
      if(this.essais_restants <= 0){
        this.defaite()
        // piège : on a perdu, on va changer de mot, donc on indique à la lettre
        // qu'elle n'est pas dans le mot
        fini = true
      }else{}
    }

    return([est_dedans, fini])
  }


  render(){
    return (
      <div className="App">
        <EnTete ref={elt => this.en_tete = elt} rafraichir={this.rafraichir}
              score={this.state.score} lang={this.state.lang} changer_lang={this.changer_lang}/>
        <Dessin ref={elt =>this.dessin = elt}/>
        <MotAdeviner ref={elt => this.mot_a_deviner = elt} liste_lettre={this.state.liste_lettre}
              dic_jeu={this.state.dic_jeu}/>
        <Clavier ref={elt => this.clavier = elt} verification = {this.jouer_lettre}
            reinit={this.state.reinit}/>
      </div>
    );
  }
}

export default App;

///////////////////////rajouter un bouton pour dire si on continue ou pas la partie
