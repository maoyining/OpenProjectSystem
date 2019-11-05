module.exports = {


  friendlyName: 'test',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let query = {
      where: {
        id: this.req.me.id
      },
      select: ['id', 'username', 'role']
    };

    let user = await User.findOne(query);

    return exits.success(user);

  }


};
