/**
 * 409 (Conflict) Response
 *
 */

module.exports = function (data) {
  const response = {
    code: _.get(data, 'code', 'E_CONFLICT'),
    message: _.get(data, 'message', 'Operation failed due to conflict'),
    data: _.get(data, 'data', {})
  };

  this.res.status(409).send(response);
};
