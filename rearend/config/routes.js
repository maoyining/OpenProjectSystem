/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'POST /api/v1/auth/signin': 'auth.signin',
  'GET /api/v1/auth/me': 'auth.me',
  'PUT /api/v1/auth/update-password': 'auth.update-password',





};
