/**
 * Blueprint API Configuration
 * (sails.config.blueprints)
 *
 * For background on the blueprint API in Sails, check out:
 * https://sailsjs.com/docs/reference/blueprint-api
 *
 * For details and more available options, see:
 * https://sailsjs.com/config/blueprints
 */

module.exports.blueprints = {

  /***************************************************************************
  *                                                                          *
  * Automatically expose implicit routes for every action in your app?       *
  *                                                                          *
  ***************************************************************************/

  actions: true,


  /***************************************************************************
  *                                                                          *
  * Automatically expose RESTful routes for your models?                     *
  *                                                                          *
  ***************************************************************************/

  rest: true,


  /***************************************************************************
  *                                                                          *
  * Automatically expose CRUD "shortcut" routes to GET requests?             *
  * (These are enabled by default in development only.)                      *
  *                                                                          *
  ***************************************************************************/

  // shortcuts: true,

  prefix: '/api/v1',

  parseBlueprintOptions(req) {
    if (!req.param('limit')) {
      req.params = req.params ? req.params : {};
      req.params['limit'] = 100000;
    }

    var queryOptions = req._sails.hooks.blueprints.parseBlueprintOptions(req);

    // Disable auto populate
    if(!req.param('populate', false) && !queryOptions.alias) {
      queryOptions.populates = {};
    }

    // // Default limit 10000 (sails default is 30)
    // if (req.options.blueprintAction === 'find' || req.options.blueprintAction === 'populate') {
    //   if (queryOptions.criteria.limit < 10000) {
    //     queryOptions.criteria.limit = 10000;
    //   }
    // }

    return queryOptions;
  }

};
