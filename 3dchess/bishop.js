import Piece from './piece';

const MOVEDIRS = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1]
];

export default class Bishop extends Piece {

  moves(){
    return this.slideMoves(MOVEDIRS);
  }

}
