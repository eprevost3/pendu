import React from 'react'
import "./Dessin.css"


class Dessin extends React.Component{
  constructor(props){
    super(props)
    this.canvas = undefined
    this.ctx = undefined
    this.nb_tentatives = this.props.nb_tentives
  }

  static dess_ligne(x0, y0, x1, y1, ctx){
    ctx.lineWidth = 8;
    ctx.strokeStyle = "white"
    ctx.beginPath()
    ctx.moveTo(x0,y0)
    ctx.lineTo(x1,y1)
    ctx.stroke()
  }

  static dess_cercle(x, y, r, ctx){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
  }

  dessiner = (index) => {
    switch (index) {
      case 10:
        this.constructor.dess_ligne(100,280,200,280, this.ctx)
        break;
      case 9:
        this.constructor.dess_ligne(150,280,150,20, this.ctx)
        break;
      case 8:
        this.constructor.dess_ligne(154,20,50,20, this.ctx)
        break;
      case 7:
        this.constructor.dess_ligne(120,20,150,50, this.ctx)
        break;
      case 6:
        this.constructor.dess_ligne(70,20,70,80, this.ctx)
        break;
      case 5:
        this.constructor.dess_cercle(70,100,20,this.ctx)
        break;
      case 4:
        this.constructor.dess_ligne(70,120,70,170, this.ctx)
        break;
      case 3:
        this.constructor.dess_ligne(30,140,110,140, this.ctx)
        break;
      case 2:
        this.constructor.dess_ligne(70,170,30,200, this.ctx)
        break;
      case 1:
        this.constructor.dess_ligne(70,170,110,200, this.ctx)
        break;
      default:
    }
  }

  effacer = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  componentDidMount() {
    this.canvas = this.refs.canvas
    this.ctx = this.canvas.getContext("2d")
  }

  render() {
     return (
         <canvas ref="canvas" width={300} height={300}/>
     )
   }

}

export default Dessin
