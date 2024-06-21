import ClbError from './clb-error';

export default class UnauthorizedError extends ClbError {
  constructor(message: string = 'UnauthorizedError') {
    super(
      {
        reason: message,
      },
      401,
    );
  }
}
