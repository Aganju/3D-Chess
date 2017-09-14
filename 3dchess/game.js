document.addEventListener('DOMContentLoaded', ()=>{
  let selectedSquare;
  const pickPiece = (src, piece, currPos, currOrientation) => {
    boards.greySquare(src, 0xFFFFFF);
    if(selectedSquare ){
      boards.move(selectedSquare + '-' + src);
      selectedSquare = null;
      boards.removeGreySquares();
    }
    else if (piece) selectedSquare= src;
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

});
