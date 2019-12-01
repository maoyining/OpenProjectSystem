module.exports = {


  friendlyName: 'Get info of the current user',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function () {

    let attributesToSelect = sails.helpers.getAttributesToSelect(this.req);
    let query = {
      select : attributesToSelect,
    };
    let user = await User.find(query);

    return user;

  }


};
