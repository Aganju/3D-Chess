export default class Piece {
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
    this.moves().forEach((move)=>{
      if( !this.board.resultsInCheck(move) &&
          ( !this.board.pieces[move] ||
            this.board.pieces[move].color !== this.color)) vMoves.push(move);
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
