import ClbError from './clb-error';

export default class NotFoundError extends ClbError {
  constructor(message: string = 'NotFoundError') {
    super(
      {
        reason: message,
      },
      404,
    );
  }
}
