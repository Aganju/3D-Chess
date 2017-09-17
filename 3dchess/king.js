import Piece from './piece';

const MOVEOFFSETS = [
  [ 1, 1],
  [-1, 1],
  [ 1,-1],
  [-1,-1],
  [ 0, 1],
  [ 1, 0],
  [ 0,-1],
  [-1, 0]
];

export default class King extends Piece {

  moves(){
    return this.stepMoves(MOVEOFFSETS);
  }

}
