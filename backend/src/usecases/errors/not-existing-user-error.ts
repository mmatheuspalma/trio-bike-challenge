export class NotExistingUserError extends Error {
  public httpStatus = 404;
  constructor() {
    super();
    this.name = 'NotExistingUserError';
    this.message = `This user does not exist`;
  }
}
