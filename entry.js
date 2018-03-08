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

  let tiles= [];
  let pieces = [];

  function Board (){
    this.board = board;
    this.playerTurn = 1;
    this.viewPorts = ["10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin", "100vmin"]
  }

  Board.prototype.initialize = function(){
    for(row in this.board){
      for(col in this.board[row]){

        let tile = '<div class="tile" style=top:%top%;left:%left%;></div>';
        newTile = tile.replace('%top%',this.viewPorts[row]);
        newTile = newTile.replace('%left%',this.viewPorts[col]);
        document.querySelector('.tiles').insertAdjacentHTML('beforeend',newTile);

        if(this.board[row][col] !== 0){
          let piece = '<div class="piece" style=top:%top%;left:%left%;>%piece%</div>';
          newPiece = piece.replace('%top%',this.viewPorts[row]);
          newPiece = newPiece.replace('%left%',this.viewPorts[col]);
          newPiece = newPiece.replace('%piece%',this.board[row][col]);

          document.querySelector('.pieces').insertAdjacentHTML('beforeend',newPiece);

        }
      }
    }
  }

  let boardObj = new Board();
  boardObj.initialize();



}
