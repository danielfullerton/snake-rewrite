import { Provider } from '../../common/interfaces/Provider';
import { Snake } from '../entity/Snake';
import { Board } from './Board';
import { Candy } from '../entity/Candy';
import { Container } from './Container';
import { Settings } from '../../common/constants/Settings';
import { QuerySelector } from '../../common/constants/QuerySelector';
import { Graphics } from '../../common/constants/Graphics';

export class Renderer implements Provider {
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
      this.context.fillStyle = segment.getColor();
      this.context.fillRect(segment.getX(), segment.getY(), Graphics.SnakeSegmentSize, Graphics.SnakeSegmentSize);
      segment.setDirection(previousSegment.getDirection());
      return segment;
    }, segs[0]);
  }

  private drawCandy () {
    this.context.fillStyle = this.candy.getPoint().getColor();
    this.context.beginPath();
    this.context.arc(
      this.candy.getPoint().getX() + Graphics.CandyRadius,
      this.candy.getPoint().getY() + Graphics.CandyRadius,
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
