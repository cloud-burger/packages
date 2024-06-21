import ClbError from './clb-error';

export default class ConflictError extends ClbError {
  constructor(message: string = 'ConflictError') {
    super(
      {
        reason: message,
      },
      409,
    );
  }
}
