export class NotExistingBikeError extends Error {
  public httpStatus = 404;
  constructor() {
    super();
    this.name = 'NotExistingBikeError';
    this.message = `This bike does not exist`
  }
}
