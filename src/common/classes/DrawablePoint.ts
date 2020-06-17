import { Graphics } from '../constants/Graphics';

const randomColor = require('randomcolor');

export class DrawablePoint {

  constructor (
    protected x: number = DrawablePoint.getRandomCoordinateValue(),
    protected y: number = DrawablePoint.getRandomCoordinateValue(),
    protected color: string = DrawablePoint.getRandomColor()
  ) {}

  getX () {
    return this.x;
  }

  setX (x: number) {
    this.x = x;
  }

  getY () {
    return this.y;
  }

  setY (y: number) {
    this.y = y;
  }

  getColor () {
    return this.color;
  }

  setColor (color: string) {
    this.color = color;
  }

  protected setRandomColor () {
    this.color = DrawablePoint.getRandomColor();
  }

  static getRandomColor () {
    return randomColor({
      luminosity: 'bright'
    });
  }

  static getRandomCoordinateValue () {
    const upperLimit = Graphics.BoardSize - Graphics.GridPositionSize;
    const squares = upperLimit / Graphics.GridPositionSize;

    return (Math.round(Math.random() * squares)) * Graphics.GridPositionSize;
  }
}
