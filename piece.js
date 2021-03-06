function Piece(id,element, position){
  this.id = id;
  this.element = element;
  this.position = position;
  this.king = false;
}

//update this.element and this.position

Piece.prototype.move = function(tile,newStylePos){
  this.element.style = `top:${newStylePos[0]};left:${newStylePos[1]};`
  this.position = tile.position;
}

Piece.prototype.makeKing = function(){
  this.king = true;
  this.element.classList.add('king')
}

export default Piece;
