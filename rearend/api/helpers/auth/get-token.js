const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Get authentication token',


  sync: true,


  inputs: {

    payload: {
      type: 'json',
      required: true
    },

    expiresIn: {
      type: 'number'
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Token',
    },

  },


  fn: function (inputs) {

    const expiresIn = _.isNil(inputs.expiresIn) ? sails.config.auth.jwt.expiresIn : inputs.expiresIn;

    return jwt.sign(inputs.payload, sails.config.auth.jwt.secretKey, { expiresIn: expiresIn });

  }


};

