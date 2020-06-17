export class Graphics {
  static readonly CandyAngle = 2 * Math.PI;
  static readonly GridPositionSize = 20;
  static readonly BoardSize = Math.pow(Graphics.GridPositionSize, 2);
  static readonly SnakeSegmentSize = Graphics.GridPositionSize;
  static readonly CandySize = Graphics.GridPositionSize;
  static readonly CandyRadius = Graphics.CandySize / 2;
  static readonly CanvasColor = '#000000';
}
