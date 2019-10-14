module.exports = {


  friendlyName: 'Update password',


  description: 'Update the password for the logged-in user.',


  inputs: {

    password: {
      description: 'The new, unencrypted password.',
      example: 'abc123v2',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // Update the record for the logged-in user.
    await User.update({ id: this.req.me.id })
    .set({
      password: inputs.password
    });

    return exits.success();

  }


};
