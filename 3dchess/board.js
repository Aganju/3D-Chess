import Pawn from 'pawn.js';
import King from 'king.js';
import Queen from 'queen.js';
import Rook from 'rook.js';
import Knight from 'knight.js';
import Bishop from 'bishop.js';

const CONSTANT_SQUARES = {};
['a','b','c','d'].forEach((file) => {
  for(let i = 1; i < 13; i++){
    const square = file +  (i > 3 ? i - Math.floor((i-1)/4) * 2 : i);
    CONSTANT_SQUARES[square] = CONSTANT_SQUARES[square] || [];
    CONSTANT_SQUARES[square].push(square + 'WNB'.charAt(Math.floor((i-1)/4)));
  }
});

export default class Board{
  constructor(position, options){
    this.pieces = {};
    this.existingSquares = this.squareList(options.moveableBoards
                                            || ['QL1','KL1','QL6','KL6']);
    this.initializeBoard(position);
    this.lastMoves = [];
  }

  move(move, store = true){
    if (store) this.lastMoves.push(move);
    const [startSq, endSq] = [...this.lastMoves.pop().split('-')];
    this.pieces[endSq] = this.pieces[startSq];
    this.pieces[endSq].position = endSq;
    delete this.pieces[startSq];
  }

  undoLastMove(){
    if (this.lastMoves.length === 0) return;
    const [startSq, endSq] = [...this.lastMoves.pop().split('-')];
    this.move(endSq + '-' + endSq, false);
  }

  initializeBoard(position){
    Object.keys(position).forEach((square) => {
      const color = position[square][0];
      switch (position[square][1]) {
        case 'P':
          this.pieces[square] = new Pawn(square, color, this);
          break;
        case 'K':
          this.pieces[square] = new King(square, color, this);
          break;
        case 'Q':
          this.pieces[square] = new Queen(square, color, this);
          break;
        case 'R':
          this.pieces[square] = new Rook(square, color, this);
          break;
        case 'N':
          this.pieces[square] = new Knight(square, color, this);
          break;
        case 'B':
          this.pieces[square] = new Bishop(square, color, this);
          break;
        default:

      }
    });
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
