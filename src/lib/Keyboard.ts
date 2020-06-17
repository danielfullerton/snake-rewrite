import { QuerySelector } from '../common/constants/QuerySelector';
import { Service } from '../common/interfaces/Service';
import { Game } from './Game';
import { Container } from './Container';

export class Keyboard implements Service {
  private game: Game;

  constructor () {
    this.addStartButtonListener();
    this.addStopButtonListener();
  }

  init () {
    this.game = Container.Game;
  }

  private addStartButtonListener () {
    document.querySelector(QuerySelector.StartButton).addEventListener('click', evt => {
      this.game?.stop();
      this.game?.start();
    });
  }

  // todo: remove after development
  private addStopButtonListener () {
    document.querySelector(QuerySelector.StopButton).addEventListener('click', evt => {
      this.game?.stop();
    });
  }
}
