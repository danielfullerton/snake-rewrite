import { DrawableVectorPoint } from './DrawableVectorPoint';
import { Direction } from '../enums/Direction';
import { Graphics } from '../constants/Graphics';

export class Segment extends DrawableVectorPoint {
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
