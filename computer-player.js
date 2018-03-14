//pass in board/pieces or smth
function computerPlayer(pieces,board,tiles,boardObj){
  this.pieces = pieces;
  this.board = board;
  this.tiles = tiles;
  //so it has access to boardObj methods;
  this.boardObj = boardObj;
}

//find a random piece that
//returns [piece,tile position]
computerPlayer.prototype.move = function(){
  let randomPiece;
  let position;
  let foundMove = false;
  while(!foundMove){
    randomPiece = this.findRandomPiece();
    position = this.canRandomPieceMove(randomPiece);
    if(position){
      this.tiles.forEach(tile => {
        if(tile.position[0] === position[0] && tile.position[1] === position[1]){
          foundMove = [randomPiece,tile]
        }
      })

    }
  }


  return foundMove;
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
  let result = false;
  if(!piece.king){
    //can only travel down: +1 on the row
    let tilePos1 = [piece.position[0] + 1, piece.position[1] + 1];
    let tilePos2 = [piece.position[0] + 1, piece.position[1] - 1];
    let pos = [tilePos1,tilePos2]
    //0 or 1
    for(let i=0;i< pos.length;i++){
      if(this.boardObj.isValidMove(piece,pos[i])){
        result = pos[i];
      }
    }
  }
  return result;
}

export default computerPlayer;
