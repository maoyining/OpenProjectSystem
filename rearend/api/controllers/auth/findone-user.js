module.exports = {


  friendlyName: 'Get info of the current user',


  description: '',


  inputs: {
    id:{
      type:'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let attributesToSelect = sails.helpers.getAttributesToSelect(this.req);
    let query = {
      where: {
        id: inputs.id
      },
      select: attributesToSelect
    };

    let user = await User.findOne(query);

    return user;

  }


};
