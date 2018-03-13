//pass in board/pieces or smth
function computerPlayer(pieces,board,tiles,boardObj){
  this.pieces = pieces;
  this.board = board;
  this.tiles = tiles;
  //so it has access to boardObj methods;
  this.boardObj = boardObj;
}

//returns [piece,tile]
computerPlayer.prototype.move = function(){

}

//returns the random piece
computerPlayer.prototype.findRandomPiece = function(){
  let numberOfPieces = this.pieces.length;
  let randomPiece;
  // let id = 12;
  while(!randomPiece){
    //random number between 0 and number of pieces-1 inclusive
    let index = Math.floor(Math.random()*numberOfPieces);
    if(this.pieces[index].id < 12){
      randomPiece = this.pieces[index]
    }
  }
  return randomPiece;
}

computerPlayer.prototype.canRandomPieceMove = function(piece){
  if(!piece.king){
    //can only travel down: +1 on the row
    
  }
}

export default computerPlayer;
