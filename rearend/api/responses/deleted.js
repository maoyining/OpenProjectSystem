/**
 * 204 (Deleted) Response
 *
 * The 204 response MUST NOT include a message-body
 *
 */

module.exports = function () {

  this.res.status(204).send();

};
