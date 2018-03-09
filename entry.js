import Piece from './piece';
import Tile from './tile';

window.onload = function(){

  let board = [
    [  0,  1,  0,  1,  0,  1,  0,  1 ],
    [  1,  0,  1,  0,  1,  0,  1,  0 ],
    [  0,  1,  0,  1,  0,  1,  0,  1 ],
    [  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  2,  0,  2,  0,  2,  0,  2,  0 ],
    [  0,  2,  0,  2,  0,  2,  0,  2 ],
    [  2,  0,  2,  0,  2,  0,  2,  0 ]
  ];

  let tiles= []; //tile objects
  let pieces = []; //piece objects

  function Board (){
    this.board = board;
    this.playerTurn = 1;
    this.viewPorts = ["10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin", "100vmin"]
  }

  Board.prototype.initialize = function(){
    let pieceCount = 0;
    for(let row in this.board){
      for(let col in this.board[row]){
        let tile = '<div class="tile" style=top:%top%;left:%left%;></div>';
        let newTile = tile.replace('%top%',this.viewPorts[row]);
        newTile = newTile.replace('%left%',this.viewPorts[col]);

        if((row % 2 === 1 && col % 2 === 0) || (row % 2 === 0 && col % 2 === 1)){
          let tileObject = new Tile(newTile,[parseInt(row),parseInt(col)]);
          tiles.push(tileObject);
          document.querySelector('.tiles').insertAdjacentHTML('beforeend',newTile);
        }else{
          document.querySelector('.non-active-tiles').insertAdjacentHTML('beforeend',newTile);
        }

        if(this.board[row][col] !== 0){
          let piece = '<div class="piece" id=piece%id% style=top:%top%;left:%left%;></div>';
          let newPiece = piece.replace('%top%',this.viewPorts[row]);
          newPiece = newPiece.replace('%left%',this.viewPorts[col]);
          newPiece = newPiece.replace('%id%',pieceCount)
          // newPiece = newPiece.replace('%piece%',this.board[row][col]);
          document.querySelector('.player' + this.board[row][col] + 'pieces').insertAdjacentHTML('beforeend',newPiece);
          let pieceObject = new Piece(document.querySelector('#piece'+String(pieceCount)),[parseInt(row),parseInt(col)]);
          pieces.push(pieceObject);
          pieceCount+=1;
        }
      }
    }
  }

  //update this.board
  //update html piece node style: change the position
  //call piece.move to update the piece object
  //change this.playerTurn
  Board.prototype.move = function(piece,tile){
    //pass in the tile object and piece object

    this.playerTurn = this.playerTurn === 1? 2 : 1;
  }

  let boardObj = new Board();
  boardObj.initialize();
  console.log(boardObj.board);
  console.log(pieces);
  console.log(tiles);



}
