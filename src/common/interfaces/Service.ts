export interface Service {
  /*
  this method should be used to
  1.) Inject dependencies
  2.) Set up anything that couldn't be instantiated in the constructor
  3.) Set any values that are lifecycle dependent (ex. score should be reset after each game, snake length should be reset after each game, etc.)
   */
  init (): void;
}
