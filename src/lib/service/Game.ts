import { Provider } from '../../common/interfaces/Provider';
import { Renderer } from './Renderer';
import { Container } from './Container';
import { Direction } from '../../common/enums/Direction';
import { QuerySelector } from '../../common/constants/QuerySelector';

export class Game implements Provider {
  private renderer: Renderer;
  private score: number;
  private running = false;
  globalDirection: Direction;

  init () {
    this.renderer = Container.Renderer;
    this.renderer.init();
    this.score = 1;
    this.updateScoreBox();
    this.globalDirection = Direction.RIGHT;
  }

  start () {
    this.renderer.start();
    this.running = true;
  }

  stop () {
    this.renderer.stop();
    this.running = false;
  }

  gameOver () {
    console.log('game over');
    this.stop();
  }

  collectedCandy () {
    this.score++;
    this.updateScoreBox();
  }

  updateScoreBox () {
    document.querySelector(QuerySelector.ScoreBox).innerHTML = `${this.score}`;
  }
}
