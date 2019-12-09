module.exports = {


  friendlyName: 'Get info of the current user',


  description: '',


  inputs: {
    role:{
      type:'number'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let attributesToSelect = sails.helpers.getAttributesToSelect(this.req);
    let query = {
      where:{
        role:inputs.role
      },
      select : attributesToSelect,
    };
    let user = await User.find(query);

    return user;

  }


};
