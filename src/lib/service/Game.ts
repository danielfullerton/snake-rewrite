import { Provider } from '../../common/interfaces/Provider';
import { Renderer } from './Renderer';
import { Container } from './Container';

export class Game implements Provider {
  private renderer: Renderer;
  private score: number;

  init () {
    this.renderer = Container.Renderer;
    this.renderer.init();
    this.score = 1;
  }

  start () {
    console.log('starting...');
    this.renderer.start();
  }

  stop () {
    console.log('stopped');
    this.renderer.stop();
  }
}
