module.exports = {


  friendlyName: 'Get attributes to select',

  description: 'Get the array of attributes from attributes-whitelist and use it later for querying',

  extendedDescription: 'If whitelist is not defined, return undefined.',

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
    }
  },


  exits: {

  },


  fn: function (inputs, exits) {

    const req = inputs.req;
    const action = inputs.action || req.options.action;
    const whitelist = action ? sails.config.attributesWhitelist[action] : undefined;

    let attributesToSelect;
    if (whitelist) {
      if (_.isArray(whitelist)) {
        attributesToSelect = whitelist;
      } else if (whitelist.select) {
        attributesToSelect = whitelist.select;
      }
    }

    return exits.success(attributesToSelect);

  }


};

