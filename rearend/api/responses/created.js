/**
 * 201 (Created) Response
 *
 * The request has been fulfilled and resulted in a new resource being created.
 * Successful creation occurred (via either POST or PUT).
 * Set the Location header to contain a link to the newly-created resource (on POST).
 * Response body content may or may not be present.
 */

module.exports = function (data) {
  // To be compatible with .then(res.ok),
  // we send only data without code & message anymore
  this.res.status(201).send(data);
};
