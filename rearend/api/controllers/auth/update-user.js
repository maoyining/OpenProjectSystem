module.exports = {


  friendlyName: 'Update user info',


  description: '',


  inputs: {
    field:{
      type:'json'
    },
    description:{
      type:'string'
    },
    phone:{
      type:'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    await User.update({ id:this.req.me.id }).set({
      field:inputs.field,
      description:inputs.description,
      phone:inputs.phone
    });
    return;

  }


};
