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

  //we can access and update actual piece object info here
  //the object contains the actual html element, and the position corresponding to this.board
  let tiles= []; //tile objects
  let pieces = []; //piece objects

  function Board (){
    this.board = board;
    this.playerTurn = 1;
    this.viewPorts = ["10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin", "100vmin"]
  }

  Board.prototype.initialize = function(){
    let pieceCount = 0;
    let tileCount = 0;
    for(let row in this.board){
      for(let col in this.board[row]){
        let tile = '<div class=tile id=tile%id% style=top:%top%;left:%left%;></div>';
        let newTile = tile.replace('%top%',this.viewPorts[row]);
        newTile = newTile.replace('%left%',this.viewPorts[col]);
        newTile = newTile.replace('%id%',tileCount);

        if((row % 2 === 1 && col % 2 === 0) || (row % 2 === 0 && col % 2 === 1)){
          document.querySelector('.tiles').insertAdjacentHTML('beforeend',newTile);
          let tileObject = new Tile(document.querySelector('#tile' + tileCount),[parseInt(row),parseInt(col)]);
          tiles.push(tileObject);
          tileCount+=1;
        }else{
          document.querySelector('.non-active-tiles').insertAdjacentHTML('beforeend',newTile);
        }

        //appending
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

    //update this.board
    let startX = piece.position[0];
    let startY = piece.position[1];
    let endX = tile.position[0];
    let endY = tile.position[1];
    let temp = this.board[startX][startY];
    this.board[startX][startY] = this.board[endX][endY];
    this.board[endX][endY] = temp;

    //update css through piece.move method
    //save the new html element position
    let newStylePos = [this.viewPorts[endX],this.viewPorts[endY]];
    //update piece element style position and the piece array position
    piece.move(tile,newStylePos)
    //this is what is happening in piece.move:
    // piece.element.style = `top:${newStylePos[0]};left:${newStylePos[1]};`
    // piece.position = tile.position;

    piece.element.classList.remove('selected')
    this.playerTurn = this.playerTurn === 1? 2 : 1;
    console.log(pieces)

  }

  let boardObj = new Board();
  boardObj.initialize();
  console.log(pieces)

  //events
  // 1. Selection of piece $('.piece').on("click", function () {
  //   1. Check if the piece belongs to the player who’s turn it is
  //   2. Loop thru each piece element and remove selected class
  //   3. Add selected class to the selected piece

  document.querySelector('.pieces').addEventListener("click", function(e){
    // need to get rid of selected class on all piece elements
    document.querySelectorAll('.piece').forEach(node => {
      node.classList.remove("selected")
    })

    let pieceNumber = e.target.id.substr(5,6);
    if(boardObj.playerTurn === 1){
      if(pieceNumber < 12){
        e.target.classList.add("selected");
        // console.log(e.target.id.substr(5,6))

      }
    }else{
      if(pieceNumber >= 12){
        e.target.classList.add("selected");
        // console.log(e.target.id.substr(5,6))

      }
    }
  })

  document.querySelector('.tiles').addEventListener(("click"),function(e){
    //make sure a tile is selected
    let selected = document.querySelector('.selected');
    let selectedPiece;
    let selectedTile;
    if(selected){
      //find selected piece and tile
      pieces.forEach(piece => {
        if(selected.id === piece.element.id){
          selectedPiece = piece;
        }
      })
      tiles.forEach(tile => {
        if(e.target.id === tile.element.id){
          selectedTile = tile;
        }
      })
      boardObj.move(selectedPiece,selectedTile);
    }
  });
}
