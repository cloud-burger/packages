import ClbError from './clb-error';

export default class ServiceUnavailableError extends ClbError {
  constructor(message: string = 'ServiceUnavailableError') {
    super(
      {
        reason: message,
      },
      503,
    );
  }
}
