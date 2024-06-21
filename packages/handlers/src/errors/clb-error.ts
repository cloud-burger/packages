export interface InvalidParam {
  value: string;
  reason: string;
}

export interface Error {
  reason: string;
  invalidParams?: InvalidParam[];
}

export default class ClbError extends Error {
  isTreated: boolean;
  statusCode: number;
  error: Error;

  constructor(error: Error, statusCode: number) {
    super(error.reason);
    this.message = error.reason;
    this.isTreated = true;
    this.statusCode = statusCode;
    this.error = error;
  }

  toObject() {
    return {
      reason: this.error.reason,
      ...(this.error.invalidParams?.length && {
        invalidParams: this.error.invalidParams,
      }),
    };
  }
}
