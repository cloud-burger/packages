import ClbError from './clb-error';

export default class GoneError extends ClbError {
  constructor(message: string = 'GoneError') {
    super(
      {
        reason: message,
      },
      410,
    );
  }
}
