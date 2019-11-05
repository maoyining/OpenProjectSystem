module.exports = {


  friendlyName: 'Filter populate attributes',

  description: 'Filter attributes of populated associations (singular/plural) according to the "populate" property in attributes-whitelist',

  extendedDescription: 'This helper is useful only before waterline supports "select" for singular model association in .populate()',

  sync: true,

  inputs: {
    req: {
      friendlyName: 'Request',
      type: 'ref',
      required: true
    },

    record: {
      friendlyName: 'The record to filter',
      descrption: 'Only support a single record. Its populated associations can be singular or plural.',
      type: 'ref',
      required: true
    },

    action: {
      friendlyName: 'Action',
      type: 'string'
    },

    associations: {
      friendlyName: 'An array of association identities',
      description: 'If provided, filter only for these associations',
      type: 'ref'
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

    if (populateSelect) {
      // If inputs.associations is not provided, filter for all associations set in the "populate" property in attributes-whitelist
      let associations = inputs.associations ? inputs.associations : _.keys(populateSelect);
      if (!_.isArray(associations)) {
        associations = [associations];
      }

      _.forEach(associations, association => {
        if (association && inputs.record[association] && populateSelect[association]) {
          if (_.isArray(inputs.record[association])) {
            // to-many (plural) association
            inputs.record[association] = _.map(inputs.record[association], one => {
              return _.pick(one, populateSelect[association]);
            });
          } else {
            // to-one (singular) association
            inputs.record[association] = _.pick(inputs.record[association], populateSelect[association]);
          }
        }
      });
    }

    return exits.success(inputs.record);

  }


};

