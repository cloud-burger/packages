import ClbError from './clb-error';

export default class TeapotError extends ClbError {
  constructor(message: string = 'TeapotError') {
    super(
      {
        reason: message,
      },
      418,
    );
  }
}
