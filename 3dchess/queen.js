import Piece from './piece';

const MOVEDIRS = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
];

export default class Queen extends Piece {

  moves(){
    return this.slideMoves(MOVEDIRS);
  }

}
