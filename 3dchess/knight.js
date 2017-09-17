import Piece from './piece.js';

const MOVEOFFSETS = [
  [ 1, -2],
  [ 1,  2],
  [-1, -2],
  [-2, -1],
  [ 2, -1],
  [ 2,  1],
  [-2,  1],
  [-1,  2]
];

export default class Knight extends Piece {

  moves(){
    return this.stepMoves(MOVEOFFSETS);
  }

}
