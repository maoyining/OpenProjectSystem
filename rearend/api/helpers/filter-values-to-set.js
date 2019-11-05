module.exports = {

  friendlyName: 'Filter values to set',

  description: 'Filter only values that are allowed to be updated for an action',

  extendedDescription: 'If whitelist is not defined, skip filtering and return all values.',

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

    attribute: {
      friendlyName: 'Attribute or attribute name',
      description: 'If data is posted as an object or array, set this argument as the data. If this argument if string, it is the attribute name.',
      type: 'ref'  // object, array ,string, undefined
    }
  },


  exits: {

  },


  fn: function (inputs, exits) {

    const req = inputs.req;
    const action = inputs.action || req.options.action;

    let values;
    if (inputs.attribute) {
      if (_.isString(inputs.attribute)) {
        values = req.param(inputs.attribute);
      } else {
        values = inputs.attribute;
      }
    } else {
      values = req.allParams();
    }

    if (action) {
      const whitelist = sails.config.attributesWhitelist[action];
      if (whitelist) {
        if (_.isArray(values)) {
          values = _.map(values, value => {
            return _.pick(value, whitelist);
          });
        } else {
          values = _.pick(values, whitelist);
        }
      }
    }

    return exits.success(values);
  }


};

