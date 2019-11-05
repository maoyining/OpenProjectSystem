module.exports = {


  friendlyName: 'Get select for .populate()',

  description: 'Get the array of attributes from attributes-whitelist and use them later in .populate()',

  extendedDescription: 'If "populate" property is not defined, return undefined.',

  sync: true,

  inputs: {
    req: {
      friendlyName: 'Request',
      type: 'ref',
      required: true
    },

    action: {
      friendlyName: 'Action',
      type: 'string'
    },

    association: {
      friendlyName: 'The association identity',
      description: 'If provided, return only for this association',
      type: 'string'
    }
  },


  exits: {

  },


  fn: function (inputs, exits) {

    const req = inputs.req;
    const action = inputs.action || req.options.action;
    const whitelist = action ? sails.config.attributesWhitelist[action] : undefined;

    let populateSelect;
    if (whitelist && !_.isArray(whitelist)) {
      populateSelect = whitelist.populate;
    }

    if (populateSelect && inputs.association) {
      populateSelect = populateSelect[inputs.association];
    }

    return exits.success(populateSelect);

  }


};

