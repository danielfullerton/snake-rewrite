import { Service } from '../common/interfaces/Service';
import { Snake } from './Snake';
import { Board } from './Board';
import { Candy } from './Candy';
import { Container } from './Container';
import { Settings } from '../common/constants/Settings';
import { QuerySelector } from '../common/constants/QuerySelector';
import { Graphics } from '../common/constants/Graphics';

export class Renderer implements Service {
  private snake: Snake;
  private board: Board;
  private candy: Candy;
  private context: CanvasRenderingContext2D;

  private running = false;

  private renderStartTime: number;

  init () {
    this.snake = Container.Snake;
    this.board = Container.Board;
    this.candy = Container.Candy;
    this.context = (document.querySelector(QuerySelector.Canvas) as HTMLCanvasElement).getContext('2d');
  }

  start () {
    this.running = true;
    this.resetRenderStartTime();
    this.cycle();
  }

  private resetRenderStartTime () {
    this.renderStartTime = new Date().getTime();
  }

  private drawSnake () {
    const segs = this.snake.getSegments();
    segs.reduce((previousSegment, segment) => {
      this.context.fillStyle = segment.color;
      this.context.fillRect(segment.x, segment.y, Graphics.SnakeSegmentSize, Graphics.SnakeSegmentSize);
      segment.dir = previousSegment.dir;
      return segment;
    }, segs[0]);
  }

  private drawCandy () {
    this.context.fillStyle = this.candy.getColor();
    this.context.beginPath();
    this.context.arc(
      this.candy.getPosition().x + Graphics.CandyRadius,
      this.candy.getPosition().y + Graphics.CandyRadius,
      Graphics.CandyRadius,
      0,
      Graphics.CandyAngle
    );
    this.context.fill();
  }

  private render () {
    this.drawSnake();
    this.drawCandy();
  }

  private cycle () {
    if (!this.running) {
      return;
    }

    const delta = new Date().getTime() - this.renderStartTime;
    if (delta >= Settings.GameSpeed) {
      this.render();
      this.resetRenderStartTime();
    }
    requestAnimationFrame(() => this.cycle());
  }

  stop () {
    this.running = false;
  }
}
