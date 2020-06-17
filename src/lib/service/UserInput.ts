import { QuerySelector } from '../../common/constants/QuerySelector';
import { Provider } from '../../common/interfaces/Provider';
import { Game } from './Game';
import { Container } from './Container';
import { Snake } from '../entity/Snake';
import { Direction } from '../../common/enums/Direction';

export class UserInput implements Provider {
  private game: Game;
  private snake: Snake;

  constructor() {
    this.addStartButtonListener();
    this.addStopButtonListener();
    this.addArrowKeyListener();
  }

  init() {
    this.game = Container.Game;
    this.snake = Container.Snake;
  }

  private addStartButtonListener() {
    document.querySelector(QuerySelector.StartButton).addEventListener('click', evt => {
      this.game?.stop();
      this.game.init();
      this.game?.start();
    });
  }

  private addArrowKeyListener() {
    window.addEventListener('keydown', (evt: KeyboardEvent) => {
      const head = this.snake.getSegments()[0];
      switch (evt.key) {
        case 'ArrowDown': {
          head.setDirection(Direction.DOWN, head.getDirection() !== Direction.UP);
          break;
        }
        case 'ArrowUp': {
          head.setDirection(Direction.UP, head.getDirection() !== Direction.DOWN);
          break;
        }
        case 'ArrowRight': {
          head.setDirection(Direction.RIGHT, head.getDirection() !== Direction.LEFT);
          break;
        }
        case 'ArrowLeft': {
          head.setDirection(Direction.LEFT, head.getDirection() !== Direction.RIGHT);
          break;
        }
        default:
          break;
      }
    });
  }

  // todo: remove after development
  private addStopButtonListener() {
    document.querySelector(QuerySelector.StopButton).addEventListener('click', evt => {
      this.game?.stop();
    });
  }
}
