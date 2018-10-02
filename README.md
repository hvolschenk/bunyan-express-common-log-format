# bunyan-express-common-log-format

Bunyan Common Log Format serializer for ExpressJS applications.

## Setup

### _Setup >_ Installation

Install this package through `npm`/`yarn`:

```sh
$ npm i -S bunyan-express-common-log-format
```

### _Setup >_ Adding the serializer

Add the formatter as a serializer to the bunyan configuration:

```js
const bunyan = require('bunyan');
const bunyanExpressCommonLogFormat = require('bunyan-express-common-log-format');

const logger = bunyan.createLogger({
  serializers: { response: bunyanExpressCommonLogFormat },
  // other bunyan configuration here
});

module.exports = logger;
```

## Usage

Once the formatter is installed and the serializer is set-up, use it with a normal log call, using
the key used during bunyan setup:

```js
const express = require('express');
const logger = require('./shared/logger');

const app = express();

// remember to call `next()` in each route to get to the middleware
app.get(/* ... */);
app.get(/* ... */);

// define the logging middleware
app.use((request, response, next) => {
  logger.info({ response: { ...request, ...response, date: new Date()  } });
  next();
});
```
