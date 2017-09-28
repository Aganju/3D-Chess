import Board from './board.js';

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('boards').setAttribute("style",
  `height:${window.innerHeight - 10}px;
  width:${(window.innerHeight - 10) * 4 / 3}px`);

  const g = new Game('boards', undefined, 'continueGame');
  const helpText = {
    free: "Free place allows you to see the move of any piece based on it's current position but you can place it anywhere",
    play: "Play against a randomly moving AI, be careful about putting him in check though!"
  }

  document.getElementById('free').addEventListener('click', g.switchMode.bind(g));
  document.getElementById('play').addEventListener('click', g.switchMode.bind(g));
  document.getElementById('start').addEventListener('click', g.startPosition.bind(g));

  document.getElementById('free').addEventListener('mouseover',() =>{
    document.getElementById('info').innerText = helpText.free;
  });
  document.getElementById('play').addEventListener('mouseover',() =>{
    document.getElementById('info').innerText = helpText.play;
  });
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

  startPosition(){
    this.visualBoard.removeGreySquares();
    this.selectedSquare = null;
    this.visualBoard.position('start');
    setTimeout(() => this.logicBoard.initializeBoard(this.visualBoard.position()), 1000);
  }
  selectSquare(square){
    this.visualBoard.greySquare(square, 0xFFFFFF);
    this.validMoves = this.logicBoard.pieces[square].validMoves();
    this.validMoves.forEach(
      (sq) => {
        const color = this.logicBoard.pieces[sq] ? 0xC80004 : 0xFFF000;
        this.visualBoard.greySquare(sq, color);
      });
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
    }//check if piece is selected and color matches
    else if( piece && piece[0] === this.currentPlayer){
      this.selectSquare(square);
    }
  }

  aiPlayer(){
    const pieces = Object.values(this.logicBoard.pieces);
    let idx = Math.floor(Math.random()*(pieces.length));
    let validMoves, piece = pieces[idx];
    while(piece.color !== this.currentPlayer ||
          (validMoves = piece.validMoves()).length === 0){
      idx = Math.floor(Math.random()*(pieces.length));
      console.log(idx);
      piece = pieces[idx];
    }
    this.selectSquare(piece.square);
    this.makeMove(validMoves[Math.floor(Math.random()*(validMoves.length))]);
  }

  freePlace(square, piece){
    this.visualBoard.greySquare(square, 0xFFFFFF);
    if(this.selectedSquare ){
      this.makeMove(square);
    }
    else if (piece) {
      this.selectSquare(square);
    }

  }

  flipPlayer(){
    this.currentPlayer = this.currentPlayer === 'w' ? 'b' : 'w';
    if(this.logicBoard.inCheck(this.currentPlayer) &&
        this.logicBoard.inCheckmate(this.currentPlayer)){
          document.getElementById('info').innerText = "CHECKMATE! Congrats you win!";
          setTimeout(() => this.startPosition(), 5000);
           this.currentPlayer = 'w'
          return;
        }
    if(this.players[this.currentPlayer] === 'AI'){
      setTimeout(() => {
        this.aiPlayer();
        this.flipPlayer();
      }, 1000);
    }
  }
  switchMode(){
    this.moveHandler = this.moveHandler === this. freePlace ?
      this.continueGame : this.freePlace;
  }

  handleBoardClick(square, piece, currPos, currOrientation){
    this.moveHandler(square, piece);
    return this.draggable;
  }

}
