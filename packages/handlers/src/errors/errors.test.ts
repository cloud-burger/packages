import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  GoneError,
  InternalServerError,
  NotFoundError,
  PreconditionFailedError,
  ServiceUnavailableError,
  TeapotError,
  TimeoutError,
  TooManyRequestsError,
  UnauthorizedError,
  UnprocessableEntityError,
  ValidationError,
} from '../index';

describe('Errors', () => {
  it('should throw bad request', () => {
    expect(new BadRequestError().toObject()).toEqual({
      reason: 'BadRequestError',
    });
  });
  it('should throw conflict', () => {
    expect(new ConflictError().toObject()).toEqual({ reason: 'ConflictError' });
  });
  it('should throw forbidden', () => {
    expect(new ForbiddenError().toObject()).toEqual({
      reason: 'ForbiddenError',
    });
  });
  it('should throw gone', () => {
    expect(new GoneError().toObject()).toEqual({ reason: 'GoneError' });
  });
  it('should throw internal server', () => {
    expect(new InternalServerError().toObject()).toEqual({
      reason: 'InternalServerError',
    });
  });
  it('should throw not found', () => {
    expect(new NotFoundError().toObject()).toEqual({ reason: 'NotFoundError' });
  });
  it('should throw precondition failed', () => {
    expect(new PreconditionFailedError().toObject()).toEqual({
      reason: 'PreconditionFailedError',
    });
  });

  it('should throw service unavailable', () => {
    expect(new ServiceUnavailableError().toObject()).toEqual({
      reason: 'ServiceUnavailableError',
    });
  });
  it('should throw teapot', () => {
    expect(new TeapotError().toObject()).toEqual({ reason: 'TeapotError' });
  });
  it('should throw timeout', () => {
    expect(new TimeoutError().toObject()).toEqual({ reason: 'TimeoutError' });
  });
  it('should throw too many requests', () => {
    expect(new TooManyRequestsError().toObject()).toEqual({
      reason: 'TooManyRequestsError',
    });
  });
  it('should throw unauthorized', () => {
    expect(new UnauthorizedError().toObject()).toEqual({
      reason: 'UnauthorizedError',
    });
  });
  it('should throw unprocessable entity', () => {
    expect(new UnprocessableEntityError().toObject()).toEqual({
      reason: 'UnprocessableEntityError',
    });
  });
  it('should throw validation', () => {
    expect(
      new ValidationError('Dados invalidos', [
        {
          reason: 'property undefined',
          value: 'null',
        },
      ]).toObject(),
    ).toEqual({
      invalidParams: [{ reason: 'property undefined', value: 'null' }],
      reason: 'Dados invalidos',
    });
  });
});
