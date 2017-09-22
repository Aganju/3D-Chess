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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Piece {
  constructor(square, color, board){
    this.square = square;
    this.color = color;
    this.board = board;
  }

  moves(){
    return [];
  }

  validMoves(){
    const vMoves = [];
    this.moves().forEach((moveSquare)=>{
      if( ( !this.board.pieces[moveSquare] || this.board.pieces[moveSquare].color !== this.color)
          && !this.board.resultsInCheck(this.square + '-' + moveSquare))
          vMoves.push(moveSquare);
    });
    return vMoves;
  }

  rank(){
    return this.square[1] === 'L' ? this.square[4] : this.square[1];
  }

  file(){
    return this.square[1] === 'L' ? this.square[3] : this.square[0];
  }

  getSquares(offset){
    const files = 'zabcde';
    const ranks = '0123456789';

    const sqFile = files.indexOf(this.file()) + offset[0];
    const sqRank = ranks.indexOf(this.rank()) + offset[1];

    const square = files[sqFile] + ranks[sqRank];
    //get same square at every level
    return this.board.existingSquares[square] || [];
  }

  stepMoves(offsets) {
    let moves = [];
    offsets.forEach((offset)=>{
      moves = moves.concat(this.getSquares(offset));
    });
    return moves;
  }

  slideMoves(directions) {
    const moves = [];

    directions.forEach((dir)=>{
      let horizOffset = dir[0];
      let vertOffset = dir[1];

      let unblocked = true;
      while(unblocked){
        const squares = this.getSquares([horizOffset, vertOffset]);

        if(squares.length === 0){
          unblocked = false;
          continue;
        }

        for (let i =0; i < squares.length; i++){
          if(this.board.pieces[squares[i]]) unblocked = false;
            moves.push(squares[i]);
        }

        horizOffset += dir[0];
        vertOffset += dir[1];
      }
    });
    return moves;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Piece;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(2);


document.addEventListener('DOMContentLoaded', ()=>{
  let selectedSquare;
  const pickPiece = (src, piece, currPos, currOrientation) => {
    boards.greySquare(src, 0xFFFFFF);
    if(selectedSquare ){
      boards.removeGreySquares();
      if(src != selectedSquare){
        board.move(selectedSquare + '-' + src);
        boards.move(selectedSquare + '-' + src);
      }
      selectedSquare = null;
    }
    else if (piece) {
      board.pieces[src].validMoves().forEach((sq) => boards.greySquare(sq, 0xFFF000));
      selectedSquare= src;
    }
    return false;
  };
  var boards = new ChessBoard3('boards', {
    draggable: true,
    position: 'start',
    onDragStart: pickPiece,
    showErrors: 'console',
    zoomControls: true,
    backgroundColor: 0x000000,
    notationColor: 0xFFFFFF
  });

  var board = new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* default */](boards.position());

});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pawn_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__king_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__queen_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rook_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__knight_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bishop_js__ = __webpack_require__(8);







const CONSTANT_SQUARES = {};
['a','b','c','d'].forEach((file) => {
  for(let i = 1; i < 13; i++){
    const square = file +  (i > 3 ? i - Math.floor((i-1)/4) * 2 : i);
    CONSTANT_SQUARES[square] = CONSTANT_SQUARES[square] || [];
    CONSTANT_SQUARES[square].push(square + 'WNB'.charAt(Math.floor((i-1)/4)));
  }
});

class Board{
  constructor(position, options = {}){
    this.pieces = {};
    this.existingSquares = this.squareList(options.moveableBoards
                                            || ['QL1','KL1','QL6','KL6']);
    this.kings = {};
    this.initializeBoard(position);
    this.lastMoves = [];
  }



  initializeBoard(position){
    Object.keys(position).forEach((square) => {
      const color = position[square][0];
      switch (position[square][1]) {
        case 'P':
          this.pieces[square] = new __WEBPACK_IMPORTED_MODULE_0__pawn_js__["a" /* default */](square, color, this);
          break;
        case 'K':
        //keep reference to kings to save time on move into check validation
          this.pieces[square] = new __WEBPACK_IMPORTED_MODULE_1__king_js__["a" /* default */](square, color, this);
          this.kings[color] = this.pieces[square];
          break;
        case 'Q':
          this.pieces[square] = new __WEBPACK_IMPORTED_MODULE_2__queen_js__["a" /* default */](square, color, this);
          break;
        case 'R':
          this.pieces[square] = new __WEBPACK_IMPORTED_MODULE_3__rook_js__["a" /* default */](square, color, this);
          break;
        case 'N':
          this.pieces[square] = new __WEBPACK_IMPORTED_MODULE_4__knight_js__["a" /* default */](square, color, this);
          break;
        case 'B':
          this.pieces[square] = new __WEBPACK_IMPORTED_MODULE_5__bishop_js__["a" /* default */](square, color, this);
          break;
        default:

      }
    });
  }

  resultsInCheck(move){
    const pieceColor = this.pieces[move.split('-')[0]].color;
    const king = this.kings[pieceColor];

    const straightOffsets = [ [0, 1], [1, 0], [0, -1], [-1, 0]  ];
    const diagOffsets = [ [1, 1], [-1, 1], [1, -1], [-1, -1] ];
    const knightOffsets = [ [ 1, -2], [ 1,  2], [-1, -2],  [-2, -1],
                            [ 2, -1], [ 2,  1], [-2,  1],  [-1,  2] ];
    const pawnDir = king.color === 'w' ? 1 : -1;
    const stepOffsets = [ [1, pawnDir], [-1, pawnDir] ].concat(knightOffsets);

    const checkForPiece = (squares, piece) => {
      if(squares.length !== 0){
          const lastSquare = squares[squares.length -1];
          const lastSquares = this.existingSquares[lastSquare[1] === 'L' ?
              lastSquare.substr(3, 5) : lastSquare.substr(0, 2)];

          for(let j = 0; j < lastSquares.length; j++){
            const possPiece = this.pieces[lastSquares[j]];
            if(possPiece && possPiece.color !== king.color){
              const pieceType = possPiece.constructor.name;
              if(pieceType === piece ||
                  ( (piece === 'Rook' || piece === 'Bishop')
                  && pieceType === 'Queen' )
               ) return true;
            }

          }
      }
      return false;
    };

    this.move(move);

    for(let i = 0; i < 4; i++){
      const straightMoves = king.slideMoves([straightOffsets[i]]);
      const diagMoves = king.slideMoves([diagOffsets[i]]);

      if(checkForPiece(straightMoves, 'Rook') || checkForPiece(diagMoves, 'Bishop')){
        this.undoLastMove();
        return true;
      }

    }

    for(let i = 0; i < stepOffsets.length; i++){
      const piece = i < 2 ? 'Pawn' : 'Knight';
      if (checkForPiece(king.getSquares(stepOffsets[i]), piece)){
        this.undoLastMove();
        return true;
      }
    }

    //if it's the kings move then his moveset might include the other king
    if(this.pieces[move.split('-')[1]] === king){
      const kingMoves = king.moves();
      for(let i = 0; i < kingMoves.length; i++){
        const piece = this.pieces[kingMoves[i]];
        if(piece && piece.constructor.name === 'King'){
          this.undoLastMove();
          return true;
        }
      }
    }

    this.undoLastMove();
    return false;

  }

  move(move, store = true){
    const [startSq, endSq] = [...move.split('-')];
    if (store) this.lastMoves.push([move, this.pieces[endSq]]);
    this.pieces[endSq] = this.pieces[startSq];
    this.pieces[endSq].square = endSq;
    delete this.pieces[startSq];
  }

  undoLastMove(){
    if (this.lastMoves.length === 0) return;
    const [move, piece] = [...this.lastMoves.pop()];
    const [startSq, endSq] = move.split('-');
    this.move(endSq + '-' + startSq, false);
    if(piece) this.pieces[endSq] = piece;
  }

  squareList(moveableBoards){
    const totalSquares = JSON.parse(JSON.stringify(CONSTANT_SQUARES));
    moveableBoards.forEach((board) => {
      const loc = board[2] / 1;
      const ranks = loc % 2 === 0 ? [loc + 2, loc + 3] : [loc - 1, loc];
      const files = board[0] === 'Q' ? ['z', 'a'] : ['d', 'e'];
      ranks.forEach((rank) =>{
        files.forEach((file)=>{
          totalSquares[file + rank] = totalSquares[file + rank] || [];
          totalSquares[file + rank].push(board + file + rank);
        });
      });
    });
    return totalSquares;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Board;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


class Pawn extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {

  constructor(square, color, board){
    super(square, color, board);
    this.homeSquare = square;
    this.dir = color === 'w' ? 1 : -1;
  }

  moves(){
    const allMoves = [];
    let forwardMoves = this.getSquares([0, this.dir]);
    if(forwardMoves.length === 0) return [];

    if (this.square === this.homeSquare)
      forwardMoves = forwardMoves.concat(this.getSquares([0, this.dir * 2]));

    forwardMoves.forEach((sq)=>{
      if(!this.board.pieces[sq]) allMoves.push(sq);
    });

    const diagonalMoves = this.getSquares([-1, this.dir]).concat(
        this.getSquares([1, this.dir])
    );

    diagonalMoves.forEach((sq) =>{
      if(this.board.pieces[sq]
         && this.board.pieces[sq].color !== this.color) allMoves.push(sq);
    });

    return allMoves;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pawn;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


const MOVEOFFSETS = [
  [ 1, 1],
  [-1, 1],
  [ 1,-1],
  [-1,-1],
  [ 0, 1],
  [ 1, 0],
  [ 0,-1],
  [-1, 0]
];

class King extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {

  moves(){
    return this.stepMoves(MOVEOFFSETS);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = King;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


const MOVEDIRS = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
];

class Queen extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {

  moves(){
    return this.slideMoves(MOVEDIRS);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Queen;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


const MOVEDIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
];

class Rook extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {

  moves(){
    return this.slideMoves(MOVEDIRS);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Rook;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece_js__ = __webpack_require__(0);


const MOVEOFFSETS = [
  [ 1, -2],
  [ 1,  2],
  [-1, -2],
  [-2, -1],
  [ 2, -1],
  [ 2,  1],
  [-2,  1],
  [-1,  2]
];

class Knight extends __WEBPACK_IMPORTED_MODULE_0__piece_js__["a" /* default */] {

  moves(){
    return this.stepMoves(MOVEOFFSETS);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Knight;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


const MOVEDIRS = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1]
];

class Bishop extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {

  moves(){
    return this.slideMoves(MOVEDIRS);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bishop;



/***/ })
/******/ ]);