/**
 * 429 (Too Many Requests) Response
 *
 */

module.exports = function (data) {
  const response = {
    code: _.get(data, 'code', 'E_TOO_MANY_REQUESTS'),
    message: _.get(data, 'message', 'Too many requests'),
    data: _.get(data, 'data', {})
  };

  // TODO: set X-Rate-Limit-Limit, X-Rate-Limit-Remaining, X-Rate-Limit-Reset

  this.res.status(429).send(response);
};
