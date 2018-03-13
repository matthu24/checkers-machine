/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tile__ = __webpack_require__(2);



window.onload = function () {

  let board = [[0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 1, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 2, 0, 2, 0, 2, 0], [0, 2, 0, 2, 0, 2, 0, 2], [2, 0, 2, 0, 2, 0, 2, 0]];

  //we can access and update actual piece object info here
  //the object contains the actual html element, and the position corresponding to this.board
  let tiles = []; //tile objects
  let pieces = []; //piece objects

  function Board() {
    this.board = board;
    this.playerTurn = 2;
    this.viewPorts = ["10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin", "100vmin"];
  }

  Board.prototype.initialize = function () {
    let pieceCount = 0;
    let tileCount = 0;
    for (let row in this.board) {
      for (let col in this.board[row]) {
        let tile = '<div class=tile id=tile%id% style=top:%top%;left:%left%;></div>';
        let newTile = tile.replace('%top%', this.viewPorts[row]);
        newTile = newTile.replace('%left%', this.viewPorts[col]);
        newTile = newTile.replace('%id%', tileCount);

        if (row % 2 === 1 && col % 2 === 0 || row % 2 === 0 && col % 2 === 1) {
          document.querySelector('.tiles').insertAdjacentHTML('beforeend', newTile);
          let tileObject = new __WEBPACK_IMPORTED_MODULE_1__tile__["a" /* default */](document.querySelector('#tile' + tileCount), [parseInt(row), parseInt(col)]);
          tiles.push(tileObject);
          tileCount += 1;
        } else {
          document.querySelector('.non-active-tiles').insertAdjacentHTML('beforeend', newTile);
        }

        if (this.board[row][col] !== 0) {
          let piece = '<div class="piece" id=piece%id% style=top:%top%;left:%left%;></div>';
          let newPiece = piece.replace('%top%', this.viewPorts[row]);
          newPiece = newPiece.replace('%left%', this.viewPorts[col]);
          newPiece = newPiece.replace('%id%', pieceCount);
          // newPiece = newPiece.replace('%piece%',this.board[row][col]);
          document.querySelector('.player' + this.board[row][col] + 'pieces').insertAdjacentHTML('beforeend', newPiece);
          let pieceObject = new __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */](document.querySelector('#piece' + String(pieceCount)), [parseInt(row), parseInt(col)]);
          pieces.push(pieceObject);
          pieceCount += 1;
        }
      }
    }
  };

  //update this.board
  //update html piece node style: change the position
  //call piece.move to update the piece object
  //change this.playerTurn
  Board.prototype.move = function (piece, tile) {
    //pass in the tile object and piece object

    //update this.board
    if (!piece.king && (this.isValidMove(piece, tile) || this.isValidJump(piece, tile.position)) || piece.king && (this.isValidKingMove(piece, tile) || this.isValidKingJump(piece, tile.position))) {
      let startX = piece.position[0];
      let startY = piece.position[1];
      let endX = tile.position[0];
      let endY = tile.position[1];
      let temp = this.board[startX][startY];
      this.board[startX][startY] = this.board[endX][endY];
      this.board[endX][endY] = temp;
      //update css through piece.move method
      //save the new html element position
      let newStylePos = [this.viewPorts[endX], this.viewPorts[endY]];
      //update piece element style position and the piece array position
      piece.move(tile, newStylePos);
      piece.element.classList.remove('selected');

      //check if need to turn piece into king

      if (!piece.king && this.playerTurn === 1 && piece.position[0] === 7) {
        piece.makeKing();
      } else if (!piece.king && this.playerTurn === 2 && piece.position[0] === 0) {
        piece.makeKing();
      }

      if (this.canJumpAny(piece)) {
        console.log('king can jump again');
      };
      this.playerTurn = this.playerTurn === 1 ? 2 : 1;
      // console.log(this.board)
    }
  };

  //1. remove from this.board
  //2. remove html node
  //3. remove piece from pieces array
  Board.prototype.jump = function (piece, tile) {
    //opponentPosition in the form of [x,y] of the board
    let opponentPosition;
    if (!piece.king) {
      opponentPosition = this.isValidJump(piece, tile.position);
    } else if (piece.king) {
      opponentPosition = this.isValidKingJump(piece, tile.position);
    }
    console.log(opponentPosition);
    let opponentElement;
    if (opponentPosition) {
      this.move(piece, tile);
      //remove opponent from board
      //1. remove from this.board, turn posiiton to zero
      this.board[opponentPosition[0]][opponentPosition[1]] = 0;
      //2. remove html node
      // elem.parentNode.removeChild(elem);
      //find the piece object that we need to remove according to its position
      pieces.forEach(piece => {
        if (piece.position[0] === opponentPosition[0] && piece.position[1] === opponentPosition[1]) {
          opponentElement = piece;
          //3. remove the piece from pieces
          pieces.splice(pieces.indexOf(piece), 1);
        }
      });
      console.log(opponentElement);
      console.log(this.board);
      opponentElement.element.parentNode.removeChild(opponentElement.element);
    }
    this.gameOver();
  };

  //if false return false if true return the position of piece to be removed
  Board.prototype.isValidJump = function (piece, tilePosition) {
    //destination is occupied
    if (this.board[tilePosition[0]][tilePosition[1]] !== 0) {
      return false;
    }

    let opponentPosition;

    if (this.playerTurn === 1) {
      //get direction of attempted jump (positive or negative):
      //For a jump in pos direction-->
      if (tilePosition[1] - piece.position[1] > 0) {
        //nothing is there to jump
        if (this.board[piece.position[0] + 1][piece.position[1] + 1] !== 2) {
          return false;
        } else {
          opponentPosition = [piece.position[0] + 1, piece.position[1] + 1];
        }
        //for a jump in neg direction -->
      } else {
        if (this.board[piece.position[0] + 1][piece.position[1] - 1] !== 2) {
          return false;
        } else {
          opponentPosition = [piece.position[0] + 1, piece.position[1] - 1];
        }
      }
      //endX must be one greater than startX: must go forward two spaces
      if (tilePosition[0] - piece.position[0] !== 2) {
        return false;
      } else {
        return opponentPosition;
      }
    } else {
      //get direction of attempted jump (positive or negative):
      //For a jump in pos direction-->
      if (tilePosition[1] - piece.position[1] > 0) {
        //nothing is there to jump
        if (this.board[piece.position[0] - 1][piece.position[1] + 1] !== 1) {
          return false;
        } else {
          opponentPosition = [piece.position[0] - 1, piece.position[1] + 1];
        }
        //for a jump in neg direction -->
      } else {
        if (this.board[piece.position[0] - 1][piece.position[1] - 1] !== 1) {
          return false;
        } else {
          opponentPosition = [piece.position[0] - 1, piece.position[1] - 1];
        }
      }

      if (tilePosition[0] - piece.position[0] !== -2) {
        return false;
      } else {
        return opponentPosition;
      }
    }
  };

  Board.prototype.isValidMove = function (piece, tile) {
    // if(Math.abs(tilePosition[1]-piece.position[1]) !== 1){
    //   return false;
    //destination is occupied
    if (this.board[tile.position[0]][tile.position[1]] !== 0) {
      return false;
    }
    if (this.playerTurn === 1) {
      //endX must be one greater than startX
      if (tile.position[0] - piece.position[0] !== 1) {
        return false;
      } else {
        return true;
      }
    } else {
      if (tile.position[0] - piece.position[0] !== -1) {
        return false;
      } else {
        return true;
      }
    }
  };

  Board.prototype.isValidKingMove = function (piece, tile) {
    if (this.board[tile.position[0]][tile.position[1]] !== 0) {
      return false;
    }
    //endX must be one greater or one less than startX
    if (tile.position[0] - piece.position[0] !== 1 && tile.position[0] - piece.position[0] !== -1) {
      return false;
    } else {
      return true;
    }
  };

  Board.prototype.isValidKingJump = function (piece, tilePosition) {
    //destination is occupied
    if (this.board[tilePosition[0]][tilePosition[1]] !== 0) {
      return false;
    }

    let opponentPosition;
    let opponentNumber = this.playerTurn === 1 ? 2 : 1;

    //jump to the right & up the board
    if (tilePosition[1] - piece.position[1] > 0 && tilePosition[0] - piece.position[0] < 0) {
      //nothing is there to jump
      if (this.board[piece.position[0] - 1][piece.position[1] + 1] !== opponentNumber) {
        console.log('failed here');
        return false;
      } else {
        opponentPosition = [piece.position[0] - 1, piece.position[1] + 1];
      }
      //jump to the right and down the board
    } else if (tilePosition[1] - piece.position[1] > 0 && tilePosition[0] - piece.position[0] > 0) {
      //nothing is there to jump
      if (this.board[piece.position[0] + 1][piece.position[1] + 1] !== opponentNumber) {
        console.log('failed here');
        return false;
      } else {
        opponentPosition = [piece.position[0] + 1, piece.position[1] + 1];
      }
      //jump to the left and down the board
    } else if (tilePosition[1] - piece.position[1] < 0 && tilePosition[0] - piece.position[0] > 0) {
      //nothing is there to jump
      if (this.board[piece.position[0] + 1][piece.position[1] - 1] !== opponentNumber) {
        console.log('failed here');
        return false;
      } else {
        opponentPosition = [piece.position[0] + 1, piece.position[1] - 1];
      }
    } else if (tilePosition[1] - piece.position[1] < 0 && tilePosition[0] - piece.position[0] < 0) {
      //nothing is there to jump
      if (this.board[piece.position[0] - 1][piece.position[1] - 1] !== opponentNumber) {
        console.log('failed here');
        return false;
      } else {
        opponentPosition = [piece.position[0] - 1, piece.position[1] - 1];
      }
    }

    //endX must be two greater than startX: must go forward two spaces
    if (Math.abs(tilePosition[0] - piece.position[0]) !== 2) {
      console.log('failed here');
      return false;
    } else {
      return opponentPosition;
    }
  };

  Board.prototype.kingMove = function (piece, tile) {
    if (this.isValidKingMove(piece, tile)) {
      // console.log(pieces)
      this.move(piece, tile);
    }
  };

  Board.prototype.kingJump = function (piece, tile) {
    // console.log('king tried to jump')
    if (this.isValidKingJump(piece, tile.position)) {
      // console.log('king jump valid')
      this.jump(piece, tile);
    }
  };

  Board.prototype.canJumpAny = function (piece) {
    //check who's turn it is
    //check if piece is king or not
    //grab the possible tiles it's possible to land on after a jump, then call is valid jump

    //need to check all four directions
    //we need to check if it's in range
    if (piece.king) {
      let upperRight = [piece.position[0] - 2, piece.position[1] + 2];
      let upperLeft = [piece.position[0] - 2, piece.position[1] - 2];
      let lowerRight = [piece.position[0] + 2, piece.position[1] + 2];
      let lowerLeft = [piece.position[0] + 2, piece.position[1] - 2];
      if (this.isValidKingJump(piece, upperRight) || this.isValidKingJump(piece, upperLeft) || this.sValidKingJump(piece, lowerRight) || this.isValidKingJump(piece, lowerLeft)) {
        return true;
      }
    }

    if (this.playerTurn === 1) {} else {}
  };

  Board.prototype.clearBoard = function () {
    location.reload();
  };

  Board.prototype.gameOver = function () {
    let player1Counter = 0;
    let player2Counter = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        if (this.board[i][j] === 1) {
          player1Counter += 1;
        } else if (this.board[i][j] === 2) {
          player2Counter += 1;
        }
      }
    }
    if (player1Counter === 0 || player2Counter === 0) {
      if (player1Counter > 0) {
        // console.log('player 1 wins!')
        document.querySelector('.victory').textContent = 'Player 1 wins!';
      } else {
        // console.log('player 2 wins!')
        document.querySelector('.victory').textContent = 'Player 2 wins!';
      }
      return true;
    } else {
      return false;
    }
  };

  let boardObj = new Board();
  boardObj.initialize();
  // console.log(pieces)

  //events
  // 1. Selection of piece $('.piece').on("click", function () {
  //   1. Check if the piece belongs to the player who’s turn it is
  //   2. Loop thru each piece element and remove selected class
  //   3. Add selected class to the selected piece

  document.querySelector('.pieces').addEventListener("click", function (e) {
    // need to get rid of selected class on all piece elements
    document.querySelectorAll('.piece').forEach(node => {
      node.classList.remove("selected");
    });

    let pieceNumber = e.target.id.substr(5, 6);
    if (boardObj.playerTurn === 1) {
      if (pieceNumber < 12) {
        e.target.classList.add("selected");
        // console.log(e.target.id.substr(5,6))
      }
    } else {
      if (pieceNumber >= 12) {
        e.target.classList.add("selected");
        // console.log(e.target.id.substr(5,6))
      }
    }
  });

  document.querySelector('.tiles').addEventListener("click", function (e) {
    //make sure a tile is selected
    let selected = document.querySelector('.selected');
    let selectedPiece;
    let selectedTile;
    if (selected) {
      //find selected piece and tile from pieces array
      pieces.forEach(piece => {
        if (selected.id === piece.element.id) {
          selectedPiece = piece;
        }
      });
      tiles.forEach(tile => {
        if (e.target.id === tile.element.id) {
          selectedTile = tile;
        }
      });
      //initial check to see if attempted move is normal or a jump
      if (Math.abs(selectedTile.position[1] - selectedPiece.position[1]) === 1) {
        if (selectedPiece.king) {
          boardObj.kingMove(selectedPiece, selectedTile);
        } else {
          boardObj.move(selectedPiece, selectedTile);
        }
      } else if (Math.abs(selectedTile.position[1] - selectedPiece.position[1]) === 2) {
        if (selectedPiece.king) {
          boardObj.kingJump(selectedPiece, selectedTile);
        } else {
          boardObj.jump(selectedPiece, selectedTile);
        }
      }
    }
  });

  document.querySelector('.reset').addEventListener('click', function () {
    boardObj.clearBoard();
  });
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Piece(element, position) {
  this.element = element;
  this.position = position;
  this.king = false;
}

//update this.element and this.position

Piece.prototype.move = function (tile, newStylePos) {
  this.element.style = `top:${newStylePos[0]};left:${newStylePos[1]};`;
  this.position = tile.position;
};

Piece.prototype.makeKing = function () {
  this.king = true;
  this.element.classList.add('king');
};

/* harmony default export */ __webpack_exports__["a"] = (Piece);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Tile(element, position) {
  this.element = element;
  this.position = position;
}

/* harmony default export */ __webpack_exports__["a"] = (Tile);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map