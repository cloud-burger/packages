# `@cloud-burger/utils`

Lib compartilhada de validações de schema e dados.

## Usage

### Schema validator

```typescript
import { validateSchema } from '@cloud-burger/utils'

const schema = Joi.object({
  name: Joi.string().required()
});

const user = {
  name: 'Daniel'
}

const { data, errors } = validateSchema(schema, user);

// data = user
// errors = undefined
```

```typescript
import { validateSchema } from '@cloud-burger/utils'

const schema = Joi.object({
  name: Joi.string().required()
});

const user = {
  name: undefined
}

const { data, errors } = validateSchema(schema, user);

// data = undefined
// errors = [{ name: 'name', reason: 'name must not be empty', value: undefined }]
```
