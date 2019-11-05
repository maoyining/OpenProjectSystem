module.exports = {

  friendlyName: 'Set paginization query object',

  sync: true,

  inputs: {

    req: {
      friendlyName: 'Request',
      type: 'ref',
      required: true
    },

    query: {
      friendlyName: 'Query object',
      type: 'json'
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'The updated query object',
      outputType: 'ref'
    }

  },


  fn: function (inputs, exits) {

    const req = inputs.req;

    let query = inputs.query ? inputs.query : {};
    // Pagination
    let pageSize = (req.param('size') > 0 && req.param('size') < sails.config.custom.pagination.maxPageSize) ?
                    req.param('size') : sails.config.custom.pagination.maxPageSize;
    let page = req.param('page') || 1;
    let skip = (page <= 1) ? 0 : pageSize * (page - 1);
    let limit = pageSize;
    _.assign(query, {
      skip: skip,
      limit: limit
    });

    return exits.success(query);
  }


};

