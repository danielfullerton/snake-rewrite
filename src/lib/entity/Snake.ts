import { Provider } from '../../common/interfaces/Provider';
import { DrawableVectorPoint } from '../../common/classes/DrawableVectorPoint';

export class Snake implements Provider {
  private segments: DrawableVectorPoint[];

  init () {
    this.segments = [new DrawableVectorPoint(0, 0)];
  }

  getSegments () {
    return this.segments;
  }
}
