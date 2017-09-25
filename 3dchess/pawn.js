import Piece from './piece';

export default class Pawn extends Piece {

  constructor(square, color, board){
    super(square, color, board);
    this.homeSquare = square;
    this.dir = color === 'w' ? 1 : -1;
  }

  moves(){
    const allMoves = [];
    let forwardMoves = this.getSquares([0, this.dir]);
    if(forwardMoves.length === 0) return [];

    let unblocked = true;
    forwardMoves.forEach((sq)=>{
      if(this.board.pieces[sq]) unblocked = false;
    });

    if (this.square === this.homeSquare && unblocked)
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
