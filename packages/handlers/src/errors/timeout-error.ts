import ClbError from './clb-error';

export default class TimeoutError extends ClbError {
  constructor(message: string = 'TimeoutError') {
    super(
      {
        reason: message,
      },
      408,
    );
  }
}
