import Joi from 'joi';

interface Result<T> {
  errors?: ValidationError<T>[];
  data?: T;
}

interface ValidationError<T> {
  name: string;
  value: T;
  reason: string;
}

const validateSchema = <T>(schema: Joi.ObjectSchema<T>, data: T): Result<T> => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    allowUnknown: false,
  });

  const hasError = error && error.details.length;

  if (hasError) {
    const errors: ValidationError<T>[] = error.details.map((error) => ({
      name: error.context.key,
      value: error.context.value,
      reason: error.message.replace(/"/g, ''),
    }));

    return {
      errors,
    };
  }

  return { data: value };
};

export default validateSchema;
