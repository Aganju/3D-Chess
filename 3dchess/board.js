import Pawn from './pawn.js';
import King from './king.js';
import Queen from './queen.js';
import Rook from './rook.js';
import Knight from './knight.js';
import Bishop from './bishop.js';

const CONSTANT_SQUARES = {};
['a','b','c','d'].forEach((file) => {
  for(let i = 1; i < 13; i++){
    const square = file +  (i > 3 ? i - Math.floor((i-1)/4) * 2 : i);
    CONSTANT_SQUARES[square] = CONSTANT_SQUARES[square] || [];
    CONSTANT_SQUARES[square].push(square + 'WNB'.charAt(Math.floor((i-1)/4)));
  }
});

export default class Board{
  constructor(position, options = {}){
    this.pieces = {};
    this.existingSquares = this.squareList(options.moveableBoards
                                            || ['QL1','KL1','QL6','KL6']);
    this.kings = {};
    this.initializeBoard(position);
    this.lastMoves = [];
  }



  initializeBoard(position){
    this.pieces = {};
    Object.keys(position).forEach((square) => {
      const color = position[square][0];
      switch (position[square][1]) {
        case 'P':
          this.pieces[square] = new Pawn(square, color, this);
          break;
        case 'K':
        //keep reference to kings to save time on move into check validation
          this.pieces[square] = new King(square, color, this);
          this.kings[color] = this.pieces[square];
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

  position(){
    const pos = {};
    Object.keys(this.pieces).forEach((sqr) => {
      const pieceName = this.pieces[sqr].constructor.name;
      pos[sqr] = this.pieces[sqr].color +
                (pieceName === 'Knight' ? 'N' : pieceName[0] );
    });
    return pos;
  }

  resultsInCheck(move){

    this.move(move);
    const result = this.inCheck(this.pieces[move.split('-')[1]].color);
    this.undoLastMove();
    return result;
  }

  inCheckmate(color){
    const allPieceSquares = Object.keys(this.pieces);
    for(let i = 0; i < allPieceSquares.length; i++){
      const piece = this.pieces[allPieceSquares[i]];
      if(piece.color === color && piece.validMoves().length > 0)
       return false;
    }
    return true;
  }

  inCheck(color){
    const king = this.kings[color];

    const straightOffsets = [ [0, 1], [1, 0], [0, -1], [-1, 0]  ];
    const diagOffsets = [ [1, 1], [-1, 1], [1, -1], [-1, -1] ];
    const pawnDir = king.color === 'w' ? 1 : -1;
    //pawn attack plus knight attack offsets
    const stepOffsets = [ [1, pawnDir], [-1, pawnDir], [ 1, -2], [ 1,  2],
                [-1, -2],  [-2, -1], [ 2, -1], [ 2,  1], [-2,  1],  [-1,  2] ];

    for(let i = 0; i < 4; i++){
      const straightMoves = king.slideMoves([straightOffsets[i]]);
      const diagMoves = king.slideMoves([diagOffsets[i]]);

      if(this.checkForPiece(straightMoves, 'Rook', color) ||
          this.checkForPiece(diagMoves, 'Bishop', color))  return true;
    }

    for(let i = 0; i < stepOffsets.length; i++){
      const piece = i < 2 ? 'Pawn' : 'Knight';
      if (this.checkForPiece(king.getSquares(stepOffsets[i]), piece, color))
        return true;
    }

    //if it's the kings move then his moveset might include the other king
    if(this.lastMoves.slice(-1)[0][0].split('-')[1] === king.square){
      const kingMoves = king.moves();
      for(let i = 0; i < kingMoves.length; i++){
        const piece = this.pieces[kingMoves[i]];
        if(piece && piece.constructor.name === 'King'){
          return true;
        }
      }
    }

    return false;

  }

  checkForPiece(squares, piece, color) {
    if(squares.length !== 0){
        const lastSquare = squares[squares.length -1];
        const lastSquares = this.existingSquares[lastSquare[1] === 'L' ?
            lastSquare.substr(3, 5) : lastSquare.substr(0, 2)];

        for(let j = 0; j < lastSquares.length; j++){
          const possPiece = this.pieces[lastSquares[j]];
          if(possPiece && possPiece.color !== color){
            const pieceType = possPiece.constructor.name;
            if(pieceType === piece ||
                ( (piece === 'Rook' || piece === 'Bishop')
                && pieceType === 'Queen' )
             ) return true;
          }

        }
    }
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
