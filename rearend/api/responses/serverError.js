/**
 * 500 (Internal Server Error) Response
 *
 * A generic error message, given when no more specific message is suitable.
 * The general catch-all error when the server-side throws an exception.
 */

module.exports = function (data) {
  const response = {
    code: _.get(data, 'code', 'E_INTERNAL_SERVER_ERROR'),
    message: _.get(data, 'message', 'Something bad happened on the server'),
    data: _.get(data, 'data', {})
  };

  if (sails.config.environment === 'development') {
    // Log error to console
    sails.log.error(data);
  } else if (sails.config.environment === 'production') {
    // Log error to log file
    sails.log.error(data);
    // Omit detailed message in production
    response.message = 'Something bad happened on the server';
  }

  if (sails.config.environment === 'test') {
    console.log(data); // do not use sails.log, because log is 'silent' in config/test.js
  }

  this.res.status(500).send(response);
};
