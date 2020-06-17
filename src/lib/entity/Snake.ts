import { Provider } from '../../common/interfaces/Provider';
import { Direction } from '../../common/enums/Direction';
import { Graphics } from '../../common/constants/Graphics';
import { Game } from '../service/Game';
import { Container } from '../service/Container';
import { Candy } from './Candy';
import { DrawablePoint } from '../../common/classes/DrawablePoint';
import { Segment } from '../../common/classes/Segment';

export class Snake implements Provider {
  private segments: Segment[];
  private game: Game;
  private candy: Candy;

  init () {
    this.game = Container.Game;
    this.candy = Container.Candy;
    this.segments = [
      new Segment(Graphics.SnakeSegmentSize * 2, 0),
      new Segment(Graphics.SnakeSegmentSize, 0),
      new Segment(0, 0)
    ];
  }

  addSegment () {
    const tail = this.segments[this.segments.length - 1];
    const { x, y } = this.getCoordinatesFromDirection(tail);
    const newSegment = new Segment(x, y, DrawablePoint.getRandomColor(), tail.getDirection());
    this.segments.push(newSegment);
  }

  getSegments () {
    return this.segments;
  }

  getCoordinatesFromDirection (sibling: Segment): { x: number, y: number } {
    let x = sibling.getX();
    let y = sibling.getY();

    if (sibling.getDirection() === Direction.UP) {
      y += Graphics.SnakeSegmentSize;
    } else if (sibling.getDirection() === Direction.DOWN) {
      y -= Graphics.SnakeSegmentSize;
    } else if (sibling.getDirection() === Direction.LEFT) {
      x += Graphics.SnakeSegmentSize;
    } else {
      x -= Graphics.SnakeSegmentSize;
    }

    return { x, y };
  }

  moveSegments () {
    let collided = false;
    for (let i = this.segments.length - 1; i >= 0; i--) {
      const segment = this.segments[i];
      if (i !== 0) {
        segment.setDirection(this.segments[i - 1].getDirection());
      } else {
        segment.setDirection(this.game.globalDirection);
      }

      const restOfSegments = this.segments.filter((segment, index) => i !== index);
      const collidedOtherSegment = Snake.collidedWithOtherSegment(segment, restOfSegments);
      const collidedWall = (i === 0 && Snake.collidedWithWall(segment));

      if (collidedWall || collidedOtherSegment) {
        collided = true;
      }

      if (this.collidedWithCandy(segment)) {
        this.candy.setNewPoint();
        this.game.collectedCandy();
        this.addSegment();
      }
    }

    if (collided) {
      this.game.gameOver();
    } else {
      this.segments.forEach(segment => segment.move());
    }

      // .map((segment, index) => {
      //   const restOfSegments = backwardsSegments.filter((segment, i) => i !== index);
      //   const collidedOtherSegment = Snake.collidedWithOtherSegment(segment, restOfSegments);
      //   const collidedWall = (index === 0 && Snake.collidedWithWall(segment));
      //
      //   if (collidedOtherSegment || collidedWall) {
      //     this.game.gameOver();
      //   }
      //
      //   if (this.collidedWithCandy(segment)) {
      //     this.candy.setNewPoint();
      //     this.game.collectedCandy();
      //     this.addSegment();
      //   }
      //   return segment;
      // })
  }

  private collidedWithCandy (segment: Segment): boolean {
    return (
      segment.getX() === this.candy.getPoint().getX() &&
      segment.getY() === this.candy.getPoint().getY()
    );
  }

  private static collidedWithWall (segment: Segment): boolean {
    return (
      segment.getX() >= Graphics.BoardSize ||
      segment.getX() < 0 ||
      segment.getY() >= Graphics.BoardSize ||
      segment.getY() < 0
    );
  }

  private static collidedWithOtherSegment (segment: Segment, restOfSegments: Segment[]): boolean {
    return restOfSegments.reduce((prev, curr) => {
      return prev || (segment.getX() === curr.getX() && segment.getY() === curr.getY())
    }, false);
  }
}
