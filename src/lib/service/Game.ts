import { Provider } from '../../common/interfaces/Provider';
import { Renderer } from './Renderer';
import { Container } from './Container';

export class Game implements Provider {
  private renderer: Renderer;
  private score: number;
  private running = false;

  init () {
    this.renderer = Container.Renderer;
    this.renderer.init();
    this.score = 1;
  }

  start () {
    this.renderer.start();
    this.running = true;
  }

  stop () {
    this.renderer.stop();
    this.running = false;
  }
}
