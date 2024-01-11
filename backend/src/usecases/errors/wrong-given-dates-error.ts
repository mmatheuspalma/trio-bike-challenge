export class WrongGivenDatesError extends Error {
  public httpStatus = 500;
  constructor() {
    super();
    this.name = 'WrongGivenDatesError';
    this.message = 'Wrong given date range';
  }
}
