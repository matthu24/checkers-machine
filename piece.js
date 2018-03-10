function Piece(element, position){
  this.element = element;
  this.position = position;
}

//update this.element and this.position

Piece.prototype.move = function(tile,newStylePos){
  this.element.style = `top:${newStylePos[0]};left:${newStylePos[1]};`
  this.position = tile.position;
}

export default Piece;
