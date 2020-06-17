import { DrawablePoint } from './DrawablePoint';
import { Direction } from '../enums/Direction';

export abstract class DrawableVectorPoint extends DrawablePoint {
  constructor(
    x: number = DrawablePoint.getRandomCoordinateValue(),
    y: number = DrawablePoint.getRandomCoordinateValue(),
    color: string = DrawablePoint.getRandomColor(),
    protected direction: Direction = Direction.RIGHT
  ) {
    super(x, y, color);
  }

  getDirection() {
    return this.direction;
  }

  setDirection(direction: Direction, condition = true) {
    if (condition) {
      this.direction = direction;
    }
  }

  abstract move(): void;
}
