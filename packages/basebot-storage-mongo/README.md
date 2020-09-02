## basebot-storage-mongo

MongoDB storage module for Basebot

### Usage

Requires the following env vars:

`DB_URL`

services/../storage
```javascript
  import storage from 'basebot-storage-mongo'
  import { logger } from '../'

  export default storage(logger)
```
