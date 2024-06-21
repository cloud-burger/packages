import ClbError from './clb-error';

export default class BadRequestError extends ClbError {
  constructor(message: string = 'BadRequestError') {
    super(
      {
        reason: message,
      },
      400,
    );
  }
}
