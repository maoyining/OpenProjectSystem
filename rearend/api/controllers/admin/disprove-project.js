module.exports = {


  friendlyName: 'agree teacher to take over',


  description: '',


  inputs: {
    uid:{
      type:'string',
      required:true
    },
    pid:{
      type:'string',
      required:true
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    await UserProject.update({
      user:inputs.uid,
      project:inputs.pid,
    }).set({
      status:6
    });
    return;

  }


};
