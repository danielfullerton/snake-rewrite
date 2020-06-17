import { QuerySelector } from '../../common/constants/QuerySelector';
import { Provider } from '../../common/interfaces/Provider';
import { Game } from './Game';
import { Container } from './Container';
import { Direction } from '../../common/enums/Direction';

export class UserInput implements Provider {
  private game: Game;

  constructor() {
    this.addStartButtonListener();
    this.addArrowKeyListener();
  }

  init() {
    this.game = Container.Game;
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
      switch (evt.key) {
        case 'ArrowDown': {
          this.game.globalDirection = Direction.DOWN;
          // head.setDirection(Direction.DOWN, head.getDirection() !== Direction.UP);
          break;
        }
        case 'ArrowUp': {
          this.game.globalDirection = Direction.UP;
          // head.setDirection(Direction.UP, head.getDirection() !== Direction.DOWN);
          break;
        }
        case 'ArrowRight': {
          this.game.globalDirection = Direction.RIGHT;
          // head.setDirection(Direction.RIGHT, head.getDirection() !== Direction.LEFT);
          break;
        }
        case 'ArrowLeft': {
          this.game.globalDirection = Direction.LEFT;
          // head.setDirection(Direction.LEFT, head.getDirection() !== Direction.RIGHT);
          break;
        }
        default:
          break;
      }
    });
  }
}
