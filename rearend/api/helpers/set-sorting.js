module.exports = {


  friendlyName: 'Set sorting query object',


  description: 'By default, use "createdAt DESC"',


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
    let sortBy = req.param('sortBy') || 'createdAt';
    let order = req.param('order') || 'desc';

    _.assign(query, {
      sort: `${sortBy} ${order}`
    });

    return exits.success(query);
  }


};

