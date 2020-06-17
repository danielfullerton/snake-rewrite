import { Board as BoardService } from './Board';
import { Candy as CandyService } from './Candy';
import { Game as GameService } from './Game';
import { Keyboard as KeyboardService } from './Keyboard';
import { Renderer as RendererService } from './Renderer';
import { Snake as SnakeService } from './Snake';
import { Service } from '../common/interfaces/Service';

// Used to kinda simulate an IoC container so that all entities/services are singletons. Someone please make a good DI library! :)
export class Container {
  private static Services: { [key: string]: Service } = {};

  static readonly Board = Container.Factory<BoardService>('Board', BoardService);
  static readonly Candy = Container.Factory<CandyService>('Candy', CandyService);
  static readonly Game = Container.Factory<GameService>('Game', GameService);
  static readonly Keyboard = Container.Factory<KeyboardService>('Keyboard', KeyboardService);
  static readonly Renderer = Container.Factory<RendererService>('Renderer', RendererService);
  static readonly Snake = Container.Factory<SnakeService>('Snake', SnakeService);

  private static Factory <T extends Service>(id: string, _class: new () => T) {
    if (!Container.Services[id]) {
      Container.Services[id] = new _class();
    }
    return Container.Services[id] as T;
  }

  static initialize () {
    Object.values(Container.Services).forEach(service => {
      service.init();
    });
  }
}
