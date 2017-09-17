import Piece from './piece';

const MOVEDIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
];

export default class Rook extends Piece {

  moves(){
    return this.slideMoves(MOVEDIRS);
  }

}
