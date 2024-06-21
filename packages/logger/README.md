# `@cloud-burger/logger`

Logger set e configurations

## Usage

```typescript
import logger from '@cloud-burger/logger'

// to reset log configurations
logger.reset()

// to set log level, available options: "trace", "debug", "info", "warn" e "error"
// default: trace
logger.setLevel("debug")

// to set service name
logger.setService('self-service')

// to set request id
logger.setRequestId("123")

// to set http request
logger.setHttp("POST", "http://localhost:400", "localhost")

// to set user info
logger.setUser("id", "email")

// to get the config
logger.getConfig()

// trace log
logger.trace({
  message: "trace log"
})

// debug log
logger.debug({
  message: "debug log"
})

// info log
logger.info({
  message: "info log"
})

// warn log
logger.warn({
  message: "warn log"
})

// error log
logger.error({
  message: "error log"
})
```
