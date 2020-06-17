import { Service } from '../common/interfaces/Service';
import { Coordinate } from '../common/interfaces/Coordinate';
import { Graphics } from '../common/constants/Graphics';
const randomColor = require('randomcolor');

export class Candy implements Service {
  private position: Coordinate;
  private color: string;

  init () {
    this.setRandomCoordinates();
    this.setRandomColor();
  }

  setRandomColor () {
    this.color = randomColor({
      luminosity: 'bright'
    })
  }

  setRandomCoordinates () {
    this.position = {
      x: Candy.getRandomCoordinateValue(),
      y: Candy.getRandomCoordinateValue()
    }
  }

  getPosition () {
    return this.position;
  }

  getColor () {
    return this.color;
  }

  private static getRandomCoordinateValue () {
    const upperLimit = Graphics.BoardSize - Graphics.GridPositionSize;
    const squares = upperLimit / Graphics.GridPositionSize;

    return (Math.round(Math.random() * squares)) * Graphics.GridPositionSize;
  }
}
