import Board from './board.js';

document.addEventListener('DOMContentLoaded', ()=>{
  let selectedSquare;
  const pickPiece = (src, piece, currPos, currOrientation) => {
    boards.greySquare(src, 0xFFFFFF);
    if(selectedSquare ){
      board.move(selectedSquare + '-' + src);
      boards.move(selectedSquare + '-' + src);
      selectedSquare = null;
      boards.removeGreySquares();
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

  var board = new Board(boards.position());

});
