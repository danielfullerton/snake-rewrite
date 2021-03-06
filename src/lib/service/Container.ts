import { Candy as CandyEntity } from '../entity/Candy';
import { Game as GameService } from './Game';
import { UserInput as UserInputService } from './UserInput';
import { Renderer as RendererService } from './Renderer';
import { Snake as SnakeEntity } from '../entity/Snake';
import { Provider } from '../../common/interfaces/Provider';

// Used to kinda simulate an IoC container so that all entities/services are singletons. Someone please make a good DI library! :)
export class Container {
  private static Providers: { [key: string]: Provider } = {};

  static readonly Candy = Container.Factory<CandyEntity>('Candy', CandyEntity);
  static readonly Game = Container.Factory<GameService>('Game', GameService);
  static readonly UserInput = Container.Factory<UserInputService>('UserInput', UserInputService);
  static readonly Renderer = Container.Factory<RendererService>('Renderer', RendererService);
  static readonly Snake = Container.Factory<SnakeEntity>('Snake', SnakeEntity);

  private static Factory <T extends Provider>(id: string, _class: new () => T) {
    if (!Container.Providers[id]) {
      Container.Providers[id] = new _class();
    }
    return Container.Providers[id] as T;
  }

  static initialize () {
    Object.values(Container.Providers).forEach(service => {
      service.init();
    });
  }
}
