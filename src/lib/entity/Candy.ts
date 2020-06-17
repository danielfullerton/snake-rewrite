import { Provider } from '../../common/interfaces/Provider';
import { DrawablePoint } from '../../common/classes/DrawablePoint';

export class Candy implements Provider {
  private point: DrawablePoint;

  init () {
    this.setNewPoint();
  }

  getPoint () {
    return this.point;
  }

  setNewPoint () {
    this.point = new DrawablePoint();
  }
}
