module.exports = {


  friendlyName: 'Signin',


  description: 'Sign in by username & password',


  inputs: {

    username: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    }

  },


  exits: {

    unauthorized: {
      responseType: 'unauthorized',
      description: 'Username or password is wrong'
    },

    serverError: {
      responseType: 'serverError'
    }

  },

  fn: async function (inputs, exits) {

    const user = await User.findOne({
      where: { username: inputs.username },
      select: ['id', 'password']
    });

    if (!user) {
      throw {
        unauthorized: {
          code: 'E_USER_NOT_FOUND'
        }
      };
    }

    // compare password
    await sails.helpers.passwords.checkPassword(inputs.password, user.password)
    .intercept('incorrect', async () => {
      return {
        unauthorized: {
          code: 'E_PASSWORD_WRONG'
        }
      };
    });


    const token = sails.helpers.auth.getToken({ id: user.id });

    return exits.success({
      token: token
    });

  }

};
