export class NotAvailableBikeRentError extends Error {
  public httpStatus = 404;
  constructor() {
    super();

    this.name = 'NotAvailableBikeRentError';
    this.message = 'This bike is not available in the given date range';
  }
}
