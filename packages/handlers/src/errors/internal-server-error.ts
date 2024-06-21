import ClbError from './clb-error';

export default class InternalServerError extends ClbError {
  constructor(message: string = 'InternalServerError') {
    super(
      {
        reason: message,
      },
      500,
    );
  }
}
