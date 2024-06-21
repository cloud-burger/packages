import ClbError from './clb-error';

export default class ForbiddenError extends ClbError {
  constructor(message: string = 'ForbiddenError') {
    super(
      {
        reason: message,
      },
      403,
    );
  }
}
