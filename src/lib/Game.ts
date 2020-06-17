import { Service } from '../common/interfaces/Service';
import { Renderer } from './Renderer';
import { Container } from './Container';

export class Game implements Service {
  private renderer: Renderer;
  private score: number;

  init () {
    this.renderer = Container.Renderer;
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
