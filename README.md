# bunyan-express-common-log-format

[![Build Status](https://travis-ci.org/hvolschenk/bunyan-express-common-log-format.svg?branch=master)](https://travis-ci.org/hvolschenk/bunyan-express-common-log-format)
[![Coverage Status](https://coveralls.io/repos/github/hvolschenk/bunyan-express-common-log-format/badge.svg?branch=master)](https://coveralls.io/github/hvolschenk/bunyan-express-common-log-format?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[Bunyan](https://github.com/trentm/node-bunyan)
[Common Log Format](https://en.wikipedia.org/wiki/Common_Log_Format) serializer for
[ExpressJS](https://expressjs.com/) applications.

* [Setup][]
  * [Installation][]
  * [Adding the serializer][]
* [Usage][]
  * [Basic usage][]
  * [Overrides][]
  * [Settings][]

---

## Setup
[Setup]: #setup

### Installation
[Installation]: #installation

Install this package through `npm`:

```sh
$ npm i -S bunyan-express-common-log-format
```

### Adding the serializer
[Adding the serializer]: #adding-the-serializer

Add the formatter as a serializer to the bunyan configuration:

```js
const bunyan = require('bunyan');
const bunyanExpressCommonLogFormat = require('bunyan-express-common-log-format');

const logger = bunyan.createLogger({
  serializers: { apiCall: bunyanExpressCommonLogFormat },
  // other bunyan configuration here
});

module.exports = logger;
```

## Usage
[Usage]: #usage

Once the formatter is installed and the serializer is set-up, use it with a normal log call, using
the key used during bunyan setup (`apiCall` in the example):

### Basic usage
[Basic usage]: #basic-usage

```js
const express = require('express');
const logger = require('./shared/logger');

const app = express();

// remember to call `next()` in each route to get to the middleware
app.get(/* ... */);
app.get(/* ... */);

// define the logging middleware
app.use((request, response, next) => {
  logger.info({ apiCall: { request, response } }, 'Express API Call');
  next();
});
```

### Overrides
[Overrides]: #overrides

The serializer will do it's best to extract the necessary information from the given `request` and
`response` objects, except for `authUser` and `ident`, which are currently not extracted. All fields
can be overridden with custom values. Pass an `overrides` object to override any field. The
available fields are:

| Field           | Type   | Description                                                                |
| --------------- | ------ | -------------------------------------------------------------------------- |
| `authUser`      | string | The `userid` of the person requesting the resource                         |
| `contentLength` | string | The size of the object returned to the client, in _bytes_                  |
| `date`          | date   | The _date_, _time_ and _timezone_ of the response                          |
| `host`          | string | The host that requested the resource                                       |
| `httpVersion`   | string | The HTTP Protocol used                                                     |
| `ident`         | string | The [https://tools.ietf.org/html/rfc1413](RFC 1413) identity of the client |
| `method`        | string | The request method used to request the resource                            |
| `statusCode`    | string | The HTTP status code returned to the client                                |
| `url`           | string | The URL requested by the client                                            |

This is implemented as follows:

```js
// define the logging middleware
app.use((request, response, next) => {
  logger.info(
    { apiCall: { overrides: { authUser: 'hvolschenk' }, request, response } },
    'Express API Call',
  );
  next();
});
```

### Settings
[Settings]: #settings

Pass a `settings` object to change settings of the serializer. The available settings are:

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| `dateFormat` | string | The date format to use, please see the [dateformat](https://www.npmjs.com/package/dateformat) package for options |

This is implemented as follows:

```js
// define the logging middleware
app.use((request, response, next) => {
  logger.info(
    { apiCall: { request, response, settings: { dateFormat: 'mmmm dS, yyyy, h:MM:ss TT' } } },
    'Express API Call',
  );
  next();
});
```
