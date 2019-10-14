/**
 * 200 (OK) Response
 *
 * General status code. Most common code used to indicate success.
 * The actual response will depend on the request method used.
 * In a GET request, the response will contain an entity corresponding to the requested resource.
 * In a POST request the response will contain an entity describing or containing the result of the action.
 */

module.exports = function (data) {
  // To be compatible with .then(res.ok),
  // we send only data without code & message anymore
  this.res.status(200).send(data);
};
