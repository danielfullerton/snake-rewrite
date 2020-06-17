import { Service } from '../common/interfaces/Service';
import { Direction } from '../common/enums/Direction';
import { Coordinate } from '../common/interfaces/Coordinate';
const randomColor = require('randomcolor');

interface Segment extends Coordinate {
  dir: Direction;
  color: string;
}

export class Snake implements Service {
  private segments: Segment[];

  init () {
    this.segments = [{
      x: 0,
      y: 0,
      dir: Direction.RIGHT,
      color: randomColor({ luminosity: 'bright' })
    }];
  }

  getSegments () {
    return this.segments;
  }
}
