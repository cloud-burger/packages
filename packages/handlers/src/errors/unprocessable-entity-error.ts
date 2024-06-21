import ClbError from './clb-error';

export default class UnprocessableEntityError extends ClbError {
  constructor(message: string = 'UnprocessableEntityError') {
    super(
      {
        reason: message,
      },
      422,
    );
  }
}
