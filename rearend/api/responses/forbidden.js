/**
 * 403 (Forbidden) Response
 *
 * The request was a legal request, but the server is refusing to respond to it.
 * Unlike a 401 Unauthorized response, authenticating will make no difference.
 * Error code for user not authorized to perform the operation or the resource is unavailable for some reason.
 */

module.exports = function (data) {
  const response = {
    code: _.get(data, 'code', 'E_FORBIDDEN'),
    message: _.get(data, 'message', 'User not authorized to perform the operation'),
    data: _.get(data, 'data', {})
  };

  this.res.status(403).send(response);
};
