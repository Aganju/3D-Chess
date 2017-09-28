import Board from './board.js';

document.addEventListener('DOMContentLoaded', ()=>{
  new Game('boards', undefined, 'continueGame');
});


class Game{
  constructor(container, position = 'start', gameType = 'freePlace'){
    this.container = container;
    this.visualBoard = this.initializeVisualBoard(position);
    this.logicBoard = new Board(this.visualBoard.position());
    this.moveHandler = this[gameType];
    this.draggable = false;
    this.players = {w: 'human', b: 'AI'};
    this.currentPlayer = 'w';
  }

  initializeVisualBoard(position){
    return new ChessBoard3(this.container, {
      draggable: true,
      position: position,
      onDragStart: this.handleBoardClick.bind(this),
      showErrors: 'console',
      zoomControls: true,
      backgroundColor: 0x000000,
      notationColor: 0xFFFFFF
    });
  }

  selectSquare(square){
    this.visualBoard.greySquare(square, 0xFFFFFF);
    this.validMoves = this.logicBoard.pieces[square].validMoves();
    this.validMoves.forEach(
      (sq) => this.visualBoard.greySquare(sq, 0xFFF000));
    this.selectedSquare= square;
  }

  makeMove(square){
    this.visualBoard.removeGreySquares();
    if(square !== this.selectedSquare){
      this.logicBoard.move(this.selectedSquare + '-' + square);
      this.visualBoard.position(this.logicBoard.position());
    }
    this.selectedSquare = null;

  }

  continueGame(square, piece){
    if (this.selectedSquare ){
      const cancelMove = (square === this.selectedSquare);
      let validMove = cancelMove;
      let i = 0;
      while (!validMove && i < this.validMoves.length) {
        if(this.validMoves[i] === square) validMove = true;
        i+=1;
      }
      if(validMove ){
        this.makeMove(square);
        if(!cancelMove)this.flipPlayer();
      }
    }//check if piece is seleted and color matches
    else if( piece && piece[0] === this.currentPlayer){
      this.selectSquare(square);
    }
  }

  aiPlayer(){
    const pieces = Object.values(this.logicBoard.pieces);
    let validMoves, piece = pieces[Math.round(Math.random()*(pieces.length-1))];
    while(piece.color !== this.currentPlayer ||
          (validMoves = piece.validMoves()).length === 0){
      piece = pieces[Math.round(Math.random()*pieces.length-1)];
    }
    this.selectSquare(piece.square);
    this.makeMove(validMoves[Math.round(Math.random()*(validMoves.length-1))]);
  }

  freePlace(square, piece){
    this.visualBoard.greySquare(square, 0xFFFFFF);
    if(this.selectedSquare ){
      this.makeMove(square);
    }
    else if (piece) {
      this.selectSquare();
    }

  }

  flipPlayer(){
    this.currentPlayer = this.currentPlayer === 'w' ? 'b' : 'w';
    if(this.players[this.currentPlayer] === 'AI'){
      setTimeout(() => {
        this.aiPlayer();
        this.flipPlayer();
      }, 1000);
    }
  }
  switchMode(mode){

  }

  handleBoardClick(square, piece, currPos, currOrientation){
    this.moveHandler(square, piece);
    return this.draggable;
  }

}
