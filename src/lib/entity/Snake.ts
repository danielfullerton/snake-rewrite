import { Provider } from '../../common/interfaces/Provider';
import { DrawableVectorPoint } from '../../common/classes/DrawableVectorPoint';
import { Direction } from '../../common/enums/Direction';
import { Graphics } from '../../common/constants/Graphics';

class Segment extends DrawableVectorPoint {
  move() {
    switch (this.direction) {
      case Direction.RIGHT: {
        this.x += Graphics.SnakeSegmentSize;
        break;
      }
      case Direction.LEFT: {
        this.x -= Graphics.SnakeSegmentSize;
        break;
      }
      case Direction.UP: {
        this.y -= Graphics.SnakeSegmentSize;
        break;
      }
      case Direction.DOWN: {
        this.y += Graphics.SnakeSegmentSize;
        break;
      }
      default:
        break;
    }
  }
}

export class Snake implements Provider {
  private segments: DrawableVectorPoint[];

  init () {
    this.segments = [new Segment(0, 0)];
  }

  getSegments () {
    return this.segments;
  }
}
