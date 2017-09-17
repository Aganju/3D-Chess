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

  stepMoves(offsets) {
    let moves = [];
    const files = 'zabcde';
    const ranks = '0123456789';

    offsets.forEach((offset)=>{
      const sqFile = files.indexOf(this.file()) + offset[0];
      const sqRank = ranks.indexOf(this.rank()) + offset[1];

      const square = files[sqFile] + ranks[sqRank];
      //get same square at every level
      const squares = this.board.existingSquares[square];

//if the file or rank is not on the board or the square does not exist currently
      if(squares === undefined) return;

      moves = moves.concat(squares);
    });
    return moves;
  }

  slideMoves(directions) {
    const moves = [];
    const files = 'zabcde';
    const ranks = '0123456789';

    directions.forEach((dir)=>{
      let file = files.indexOf(this.file());
      let rank = ranks.indexOf(this.rank());
      let unblocked = true;
      while(unblocked){
        file += dir[0];
        rank += dir[1];

        const square = files[file] + ranks[rank];
        //get same square at every level
        const squares = this.board.existingSquares[square];

        if(squares === undefined){
          unblocked = false;
          continue;
        }

        for (let i =0; i < squares.length; i++){
          if(this.board.pieces[squares[i]]) unblocked = false;
            moves.push(squares[i]);
        }

      }
    });
    return moves;
  }
}
