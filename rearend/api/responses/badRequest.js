/**
 * 400 (Bad Request) Response
 *
 * The request cannot be fulfilled due to bad syntax.
 * General error when fulfilling the request would cause an invalid state.
 * Domain validation errors, missing data, etc.
 */

module.exports = function (data) {
  const response = {
    code: _.get(data, 'code', 'E_BAD_REQUEST'),
    message: _.get(data, 'message', 'The request cannot be fulfilled due to bad syntax'),
    data: _.get(data, 'data', {})
  };

  this.res.status(400).send(response);
};
