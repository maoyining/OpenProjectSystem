/**
 * 401 (Unauthorized) Response
 *
 * Similar to 403 Forbidden.
 * Specifically for use when authentication is possible but has failed or not yet been provided.
 * Error code response for missing or invalid authentication token.
 */

module.exports = function (data) {
  const response = {
    code: _.get(data, 'code', 'E_UNAUTHORIZED'),
    message: _.get(data, 'message', 'Missing or invalid authentication token'),
    data: _.get(data, 'data', {})
  };

  this.res.status(401).send(response);
};
